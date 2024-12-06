export const setLocalStorageItem = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const setLocalStorageVehicle = (identity) => {
  if (identity?.data) {
    const identityString = encodeURIComponent(JSON.stringify(identity.data));
    setLocalStorageItem("identity?.data", identityString);
  }
};

export const getLocalStorageVehicle = () => {
  const identityString = getLocalStorageItem("identity?.data");
  if (identityString) {
   const identityList = JSON.parse(decodeURIComponent(identityString));
  }
  return null;
};
