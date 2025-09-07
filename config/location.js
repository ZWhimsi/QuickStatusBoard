import * as Location from 'expo-location';

// Request location permissions
export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      return {
        success: false,
        error: 'Location permission denied'
      };
    }
    
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to request location permission'
    };
  }
};

// Get current location
export const getCurrentLocation = async () => {
  try {
    // First check if we have permission
    const permissionResult = await requestLocationPermission();
    if (!permissionResult.success) {
      return permissionResult;
    }

    // Get current position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      success: true,
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to get current location'
    };
  }
};

// Reverse geocode coordinates to get address
export const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const addresses = await Location.reverseGeocodeAsync({
      latitude,
      longitude
    });

    if (addresses.length > 0) {
      const address = addresses[0];
      return {
        success: true,
        address: {
          city: address.city || address.subregion || 'Unknown City',
          region: address.region || 'Unknown Region',
          country: address.country || 'Unknown Country',
          formatted: formatAddress(address)
        }
      };
    } else {
      return {
        success: false,
        error: 'No address found for coordinates'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to get address from coordinates'
    };
  }
};

// Format address for display
const formatAddress = (address) => {
  const parts = [];
  
  if (address.city) parts.push(address.city);
  if (address.region && address.region !== address.city) parts.push(address.region);
  if (address.country) parts.push(address.country);
  
  return parts.join(', ');
};

// Get location with address (combined function)
export const getLocationWithAddress = async () => {
  try {
    // Get current location
    const locationResult = await getCurrentLocation();
    if (!locationResult.success) {
      return locationResult;
    }

    // Get address from coordinates
    const addressResult = await getAddressFromCoordinates(
      locationResult.location.latitude,
      locationResult.location.longitude
    );

    if (!addressResult.success) {
      return {
        success: false,
        error: 'Failed to get address information'
      };
    }

    return {
      success: true,
      location: locationResult.location,
      address: addressResult.address
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to get location and address'
    };
  }
};
