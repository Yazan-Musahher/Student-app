
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import{addDoc, collection, getDoc, query, where, onSnapshot, getDocs} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAD1DfTbGFkOWbayOaWCL5VFNdZVbKuDE4",
  authDomain: "student-app-a0860.firebaseapp.com",
  projectId: "student-app-a0860",
  storageBucket: "student-app-a0860.appspot.com",
  messagingSenderId: "203960400565",
  appId: "1:203960400565:web:4d86e15eba21a3bda31cfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {app, db, addDoc, collection, getFirestore, getDoc,query, where, onSnapshot, getDocs}