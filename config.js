import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyD_CI1Rko79UXwN87xabXLDjR0kwfxhQns",
  authDomain: "buy-and-sell-corner-121.firebaseapp.com",
  projectId: "buy-and-sell-corner-121",
  storageBucket: "buy-and-sell-corner-121.appspot.com",
  messagingSenderId: "220849505208",
  appId: "1:220849505208:web:cc6ff2bbe65fe74168c54d",
  measurementId: "G-1NP7MZLCPC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const firebaseApp = getApp();
export const storage = getStorage(app, "gs://buy-and-sell-corner-121.appspot.com");