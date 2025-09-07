import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request notification permissions
export const requestNotificationPermissions = async () => {
  try {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        return {
          success: false,
          error: 'Notification permission denied'
        };
      }
      
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Must use physical device for push notifications'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to request notification permissions'
    };
  }
};

// Get push notification token
export const getPushToken = async () => {
  try {
    const permissionResult = await requestNotificationPermissions();
    if (!permissionResult.success) {
      return permissionResult;
    }

    const token = await Notifications.getExpoPushTokenAsync({
      projectId: 'your-expo-project-id', // Replace with your actual Expo project ID
    });

    return {
      success: true,
      token: token.data
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to get push token'
    };
  }
};

// Send local notification
export const sendLocalNotification = async (title, body, data = {}) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: data,
        sound: 'default',
      },
      trigger: null, // Show immediately
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to send local notification'
    };
  }
};

// Send push notification to a specific token
export const sendPushNotification = async (expoPushToken, title, body, data = {}) => {
  try {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: title,
      body: body,
      data: data,
    };

    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();
    
    if (result.data && result.data.status === 'ok') {
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Failed to send push notification'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error while sending push notification'
    };
  }
};

// Listen for notification responses
export const addNotificationResponseListener = (callback) => {
  return Notifications.addNotificationResponseReceivedListener(callback);
};

// Listen for notifications received while app is in foreground
export const addNotificationReceivedListener = (callback) => {
  return Notifications.addNotificationReceivedListener(callback);
};
