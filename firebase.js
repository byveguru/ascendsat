import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

// Auth + Firestore exports
export const auth = getAuth(app);
export const db = getFirestore(app);