// Connecting to firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGEOJRd-a8CfoMXlj7WdmRAsD-lOkzV5E",
  authDomain: "house-marketplace-app-ecc59.firebaseapp.com",
  projectId: "house-marketplace-app-ecc59",
  storageBucket: "house-marketplace-app-ecc59.appspot.com",
  messagingSenderId: "324505486172",
  appId: "1:324505486172:web:eb8c42550025fd3610f799",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
