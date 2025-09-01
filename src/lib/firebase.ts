
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCCPLhRrHzkrJ7l4MM-eBXW5zzcv0TiLIQ",
  authDomain: "studycalm-b82s3.firebaseapp.com",
  projectId: "studycalm-b82s3",
  storageBucket: "studycalm-b82s3.firebasestorage.app",
  messagingSenderId: "760513250752",
  appId: "1:760513250752:web:c9d96907e7cdd7d16ff425",
  measurementId: ""
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
