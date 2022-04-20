// ! Do not copy paste to another project
// ! This initialization is only for this project
// Import the functions you need from the SDKs you need
// wag mo na iimport
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { getDatabase, set, ref, get, child} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1cDk1aA-T4uLkFla4k2tzP1rHvUECn7s",
  authDomain: "moodt-journal.firebaseapp.com",
  projectId: "moodt-journal",
  storageBucket: "moodt-journal.appspot.com",
  messagingSenderId: "861023847423",
  appId: "1:861023847423:web:73f132c121e4a48c30ddca",
  measurementId: "G-PLV0WG2PRX"
};

import * as FirebaseInit from '/firebase/firebaseInit.js';

export function getSnapShot (path) {
    return new Promise(function(resolve, reject) {
        FirebaseInit.checkActiveUser()
                    .then(function (value) {
                        const dbRef = ref(getDatabase());
                        get(child(dbRef, `${path}/${value.uid}`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            resolve(snapshot.val());
                        } else {
                            reject (console.log("No data available"));
                        }
                        }).catch((error) => {
                        console.error(error);
                        });
                    })
    })
    
}
