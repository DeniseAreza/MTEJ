// ! Do not copy paste to another project
// ! This initialization is only for this project
// Import the functions you need from the SDKs you need
// wag mo na iimport
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { getDatabase, set, ref, get} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS7-5Y-f_0AcwywqBot0Jhbr07STYy9H0",
  authDomain: "mtej-3330e.firebaseapp.com",
  projectId: "mtej-3330e",
  storageBucket: "mtej-3330e.appspot.com",
  messagingSenderId: "661462042481",
  appId: "1:661462042481:web:bc85ac14a8dc616c0618d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// *Check if there's an active user
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //window.location = '/html/mainPage.html';
      // ...
    } else {
      // User is signed out
      // ...
      
    }
  });

