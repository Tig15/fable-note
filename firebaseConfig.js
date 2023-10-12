import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDagzK2suuKt1-h1vqACSBezLtUKQRtHsc",
  authDomain: "fablenote-9b206.firebaseapp.com",
  projectId: "fablenote-9b206",
  storageBucket: "fablenote-9b206.appspot.com",
  messagingSenderId: "367147920259",
  appId: "1:367147920259:web:4fab039a6e56349993e4b6",
  measurementId: "G-TVVRLEX3B3",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_DB);
