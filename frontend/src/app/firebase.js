import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyC3DDHT3BH_yKu9KrVa2n7uiwPL0Le3Rl8",
    authDomain: "bthere-fb381.firebaseapp.com",
    projectId: "bthere-fb381",
    storageBucket: "bthere-fb381.appspot.com",
    messagingSenderId: "349166570021",
    appId: "1:349166570021:web:d594ddf0deefb16caf8dcc",
    measurementId: "G-P8XV1M2KX7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;
