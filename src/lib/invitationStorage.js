const STORAGE_KEYS = {
  WEDDING_UID: "sakeenah_wedding_uid",
  GUEST_NAME: "sakeenah_guest_name",
  GUEST_TOKEN: "sakeenah_guest_token",
  TIMESTAMP: "sakeenah_timestamp",
};

const STORAGE_EXPIRY = 30 * 24 * 60 * 60 * 1000;

function isExpired() {
  const timestamp = localStorage.getItem(STORAGE_KEYS.TIMESTAMP);
  if (!timestamp) return true;

  const age = Date.now() - parseInt(timestamp, 10);
  return age > STORAGE_EXPIRY;
}

export function clearInvitationData() {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}

export function storeWeddingUid(uid) {
  if (!uid) return;

  try {
    localStorage.setItem(STORAGE_KEYS.WEDDING_UID, uid);
    localStorage.setItem(STORAGE_KEYS.TIMESTAMP, Date.now().toString());
  } catch (error) {
    console.error("Error storing wedding UID:", error);
  }
}

export function getWeddingUid() {
  if (isExpired()) {
    clearInvitationData();
    return null;
  }

  try {
    return localStorage.getItem(STORAGE_KEYS.WEDDING_UID);
  } catch (error) {
    console.error("Error retrieving wedding UID:", error);
    return null;
  }
}

export function storeGuestName(name) {
  if (!name) return;

  try {
    localStorage.setItem(STORAGE_KEYS.GUEST_NAME, name);
    localStorage.setItem(STORAGE_KEYS.TIMESTAMP, Date.now().toString());
  } catch (error) {
    console.error("Error storing guest name:", error);
  }
}

export function getGuestName() {
  if (isExpired()) {
    clearInvitationData();
    return null;
  }

  try {
    return localStorage.getItem(STORAGE_KEYS.GUEST_NAME);
  } catch (error) {
    console.error("Error retrieving guest name:", error);
    return null;
  }
}

export function hasInvitationData() {
  return !isExpired() && !!getWeddingUid();
}

export function getInvitationData() {
  if (isExpired()) {
    clearInvitationData();
    return { uid: null, guestName: null };
  }

  return {
    uid: getWeddingUid(),
    guestName: getGuestName(),
  };
}

export function storeInvitationData({ uid, guestName }) {
  storeWeddingUid(uid);
  if (guestName) {
    storeGuestName(guestName);
  }
}
