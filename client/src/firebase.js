import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8IymN_rCvEzV88FtYcKCHmh_ZAqsGYqQ",
  authDomain: "promptking-3b87c.firebaseapp.com",
  databaseURL: "https://promptking-3b87c-default-rtdb.firebaseio.com",
  projectId: "promptking-3b87c",
  storageBucket: "promptking-3b87c.firebasestorage.app",
  messagingSenderId: "65170646998",
  appId: "1:65170646998:web:de9d8a399a1d372f4f2677",
  measurementId: "G-L06PJWWZHE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
