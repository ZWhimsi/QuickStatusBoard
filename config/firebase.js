import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWTPbQOSGhLtJ3AN1py3Ie7LKnrawTBPI",
  authDomain: "quickstatusboard.firebaseapp.com",
  projectId: "quickstatusboard",
  storageBucket: "quickstatusboard.appspot.com",
  messagingSenderId: "210962445883",
  appId: "1:210962445883:android:4bd1b700e4e8ba30314e1e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
