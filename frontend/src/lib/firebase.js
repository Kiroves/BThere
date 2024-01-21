import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Listen for authentication state changes
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, get the ID token
    user.getIdToken().then((idToken) => {
      // Store the ID token in local storage or cookie
      localStorage.setItem('firebaseIdToken', idToken);
    });
  } else {
    // User is signed out, clear the stored ID token
    localStorage.removeItem('firebaseIdToken');
  }
});
export default app;
