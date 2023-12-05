// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXIQ-i20_xmg31XJ8PN0LaszfoDzaDKxA",
  authDomain: "audio-app-f310e.firebaseapp.com",
  projectId: "audio-app-f310e",
  storageBucket: "audio-app-f310e.appspot.com",
  messagingSenderId: "692642648318",
  appId: "1:692642648318:web:c2c90c2a16479ec8ead5af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);