// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBBEgTP8QBkt0T5IE7oyPw6ip1YZlIxr3w",
  authDomain: "olx-clone-a2120.firebaseapp.com",
  projectId: "olx-clone-a2120",
  storageBucket: "olx-clone-a2120.appspot.com",  // <-- fixed `.app` to `.com`
  messagingSenderId: "894823536755",
  appId: "1:894823536755:web:2f45a0d9ab2f8b202b7206",
  measurementId: "G-50BBST1G4S"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export for use in components
export { app, analytics, auth, db, storage };
