import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// Function to check if camera permission is granted
export const checkCameraPermission = async () => {
  try {
    const result = await check(
      Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      })
    );
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error checking camera permission:', error);
    return false;
  }
};

// Function to request camera permission
export const requestCameraPermission = async () => {
  try {
    const result = await request(
      Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      })
    );
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return false;
  }
};

// Function to check if location permission is granted
export const checkLocationPermission = async () => {
  try {
    const result = await check(
      Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      })
    );
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error checking location permission:', error);
    return false;
  }
};

// Function to request location permission
export const requestLocationPermission = async () => {
  try {
    const result = await request(
      Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      })
    );
  
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};
