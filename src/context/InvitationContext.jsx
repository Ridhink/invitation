import { createContext, useContext, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import staticConfig from "@/config/config";
import {
  getWeddingUid,
  storeWeddingUid,
  storeGuestName,
  hasInvitationData,
} from "@/lib/invitationStorage";
import { safeBase64 } from "@/lib/base64";

const InvitationContext = createContext(null);

/**
 * InvitationProvider component
 * Provides the invitation UID and config data throughout the app
 *
 * Security Features:
 * - Stores UID in localStorage to hide from URL
 * - Cleans URL after extracting parameters
 * - Prevents Wayback Machine scraping
 * - 30-day expiration for stored data
 *
 * The UID priority:
 * 1. localStorage (if not expired)
 * 2. URL path: /couple-name-2025
 * 3. URL query parameter: ?uid=couple-name-2025
 * 4. Environment variable: VITE_INVITATION_UID
 *
 * @example
 * <InvitationProvider>
 *   <App />
 * </InvitationProvider>
 */
// eslint-disable-next-line react/prop-types
export function InvitationProvider({ children }) {
  const location = useLocation();

  const invitationUid = useMemo(() => {
    // 1. First, check localStorage for existing UID
    const storedUid = getWeddingUid();
    if (storedUid) {
      return storedUid;
    }

    // 2. Try to get UID from URL path (e.g., /rifqi-dina-2025)
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      const uidFromPath = pathSegments[0];
      storeWeddingUid(uidFromPath);
      return uidFromPath;
    }

    // 3. Try to get UID from URL query parameter (legacy support)
    const urlParams = new URLSearchParams(location.search);
    const uidFromUrl = urlParams.get("uid");

    if (uidFromUrl) {
      storeWeddingUid(uidFromUrl);
      return uidFromUrl;
    }

    // 4. Fallback to environment variable
    const uidFromEnv = import.meta.env.VITE_INVITATION_UID;

    if (uidFromEnv) {
      storeWeddingUid(uidFromEnv);
      return uidFromEnv;
    }

    // If no UID is provided, log a warning
    console.warn(
      "No invitation UID found. Please provide /your-uid in the URL or set VITE_INVITATION_UID in .env",
    );
    return null;
  }, [location.pathname, location.search]);

  // Extract and store guest name from URL, then clean URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const guestParam = urlParams.get("guest");

    // Store guest name if present
    if (guestParam) {
      try {
        const decodedName = safeBase64.decode(guestParam);
        if (decodedName) {
          storeGuestName(decodedName);
        }
      } catch (error) {
        console.error("Error decoding guest name:", error);
      }
    }

    // Clean URL if we have UID in path or guest in query params
    const hasUidInPath = location.pathname !== "/" && location.pathname !== "";
    const hasGuestParam = urlParams.has("guest");
    const hasUidParam = urlParams.has("uid");

    if (hasUidInPath || hasGuestParam || hasUidParam) {
      // Only clean URL if we have data stored
      if (hasInvitationData()) {
        // Use window.history.replaceState for clean URL without reload
        window.history.replaceState({}, "", "/");
      }
    }
  }, [location.pathname, location.search]);

  // Static site: config always from static config (no API)
  const config = staticConfig.data;

  return (
    <InvitationContext.Provider
      value={{
        uid: invitationUid,
        config,
        isLoading: false,
        error: null,
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
}

/**
 * Custom hook to access the invitation UID
 *
 * @returns {object} Object containing the invitation UID
 * @throws {Error} If used outside of InvitationProvider
 *
 * @example
 * const { uid } = useInvitation();
 */
export function useInvitation() {
  const context = useContext(InvitationContext);

  if (context === null) {
    throw new Error("useInvitation must be used within InvitationProvider");
  }

  return context;
}
