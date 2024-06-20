// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "netflixgpt-026.firebaseapp.com",
  projectId: "netflixgpt-026",
  storageBucket: "netflixgpt-026.appspot.com",
  messagingSenderId: "79368454825",
  appId: "1:79368454825:web:cf4e94270e41b6ccc75fb8",
  measurementId: "G-4W0ZJLZ2BL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
