// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaKB2nwKZqH41f2aGn-l_ZEpJShLHzMXY",
  authDomain: "personal-finance-tracker-539ca.firebaseapp.com",
  projectId: "personal-finance-tracker-539ca",
  storageBucket: "personal-finance-tracker-539ca.firebasestorage.app",
  messagingSenderId: "1052423688560",
  appId: "1:1052423688560:web:c45e5f81f28a2dc3723fb5",
  measurementId: "G-R1Y9ESGE3F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
