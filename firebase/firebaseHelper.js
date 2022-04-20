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
const firebaseConfig = {
    apiKey: "AIzaSyBS7-5Y-f_0AcwywqBot0Jhbr07STYy9H0",
    authDomain: "mtej-3330e.firebaseapp.com",
    projectId: "mtej-3330e",
    storageBucket: "mtej-3330e.appspot.com",
    messagingSenderId: "661462042481",
    appId: "1:661462042481:web:bc85ac14a8dc616c0618d0"
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
