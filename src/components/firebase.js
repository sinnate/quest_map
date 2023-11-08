// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfqGWW6gabyzdQ7ObXLfdOK-5tk5-P0bo",
  authDomain: "questmapmarker-72b17.firebaseapp.com",
  databaseURL: "https://questmapmarker-72b17-default-rtdb.firebaseio.com",
  projectId: "questmapmarker-72b17",
  storageBucket: "questmapmarker-72b17.appspot.com",
  messagingSenderId: "978151960889",
  appId: "1:978151960889:web:97c32fd9965357f8c978e8",
  measurementId: "G-QJX8MDVSVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const db = getDatabase(app);

export const db = getFirestore(app);