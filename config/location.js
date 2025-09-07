// Simplified location - will work without native modules
export const requestLocationPermission = async () => {
  try {
    // For now, just return true to avoid native module issues
    console.log("Location permission requested (simplified)");
    return true;
  } catch (error) {
    console.error("Location permission error:", error);
    return false;
  }
};

export const getCurrentLocation = async () => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      throw new Error("Location permission not granted");
    }

    // For now, return a mock location to avoid native module issues
    const mockLocation = {
      latitude: 33.749, // Atlanta, GA coordinates
      longitude: -84.388,
      address: "Atlanta, GA, USA (Mock Location)",
    };

    console.log("Location obtained (simplified):", mockLocation);
    return mockLocation;
  } catch (error) {
    console.error("Location error:", error);
    throw error;
  }
};
