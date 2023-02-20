
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import{addDoc, collection, getDoc, query, where, onSnapshot, getDocs} from "firebase/firestore"

const firebaseConfig = {
  apiKey: ""-----",",
  authDomain: "-----",
  projectId: "-----",
  storageBucket: "-----",
  messagingSenderId: "-----",
  appId: "1:------"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {app, db, addDoc, collection, getFirestore, getDoc,query, where, onSnapshot, getDocs}
