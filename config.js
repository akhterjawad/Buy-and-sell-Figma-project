
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyC9FO4GXdiNNvCCNXH82wbQgFxlvL2kIg4",
    authDomain: "task-manager-121.firebaseapp.com",
    projectId: "task-manager-121",
    storageBucket: "task-manager-121.appspot.com",
    messagingSenderId: "972680177048",
    appId: "1:972680177048:web:74302d4cad4bfbfc35f7ed",
    measurementId: "G-F3VLP16WR4"
  };

  // Initialize Firebase
   const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);