import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "rpg-test-2f872.firebaseapp.com",
  projectId: "rpg-test-2f872",
  storageBucket: "rpg-test-2f872.appspot.com",
  messagingSenderId: "55225288118",
  appId: "1:55225288118:web:77c7b2c8d1670888baad17",
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();
export const database = getDatabase();
