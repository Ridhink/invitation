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

export function InvitationProvider({ children }) {
  const location = useLocation();

  const invitationUid = useMemo(() => {
    const storedUid = getWeddingUid();
    if (storedUid) {
      return storedUid;
    }

    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      const uidFromPath = pathSegments[0];
      storeWeddingUid(uidFromPath);
      return uidFromPath;
    }

    const urlParams = new URLSearchParams(location.search);
    const uidFromUrl = urlParams.get("uid");

    if (uidFromUrl) {
      storeWeddingUid(uidFromUrl);
      return uidFromUrl;
    }

    const uidFromEnv = import.meta.env.VITE_INVITATION_UID;

    if (uidFromEnv) {
      storeWeddingUid(uidFromEnv);
      return uidFromEnv;
    }

    console.warn(
      "No invitation UID found. Please provide /your-uid in the URL or set VITE_INVITATION_UID in .env",
    );
    return null;
  }, [location.pathname, location.search]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const guestParam = urlParams.get("guest");

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

    const hasUidInPath = location.pathname !== "/" && location.pathname !== "";
    const hasGuestParam = urlParams.has("guest");
    const hasUidParam = urlParams.has("uid");

    if (hasUidInPath || hasGuestParam || hasUidParam) {
      if (hasInvitationData()) {
        window.history.replaceState({}, "", "/");
      }
    }
  }, [location.pathname, location.search]);

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

export function useInvitation() {
  const context = useContext(InvitationContext);

  if (context === null) {
    throw new Error("useInvitation must be used within InvitationProvider");
  }

  return context;
}
