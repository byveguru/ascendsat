import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Firebase config (FROM YOUR CONSOLE)
const firebaseConfig = {
  apiKey: "AIzaSyDPU7O8nCqi_arKZdFewueoNROXrkZTx4Y",
  authDomain: "ascendsat.firebaseapp.com",
  projectId: "ascendsat",
  storageBucket: "ascendsat.firebasestorage.app",
  messagingSenderId: "1044017528005",
  appId: "1:1044017528005:web:25e699e7c105854f0344ac",
  measurementId: "G-1LG0WJM9TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth + Firestore + Storage exports
// Native needs an explicit AsyncStorage-backed persistence layer or auth state
// won't survive an app restart; web keeps the default browser persistence.
export const auth = Platform.OS === "web"
  ? getAuth(app)
  : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
export const db = getFirestore(app);
export const storage = getStorage(app);