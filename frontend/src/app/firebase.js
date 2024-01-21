import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};
console.log(firebaseConfig)

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;
