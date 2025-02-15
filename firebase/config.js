import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";  

const firebaseConfig = {
  apiKey: "AIzaSyDEOKPJdWFMDk6KLo-0VtaU05hJlRiEJDs",
  authDomain: "next-js-c0der.firebaseapp.com",
  projectId: "next-js-c0der",
  storageBucket: "next-js-c0der.appspot.com", 
  messagingSenderId: "434185872366",
  appId: "1:434185872366:web:5a10d559f092edd076e4ff",
  measurementId: "G-H2WJ21LWJV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);  
