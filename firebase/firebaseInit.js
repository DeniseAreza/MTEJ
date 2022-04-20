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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// ! ALl queries
// * check active user
export function checkActiveUser() {
  return new Promise(function (resolve, reject) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        resolve(user);
        // ...
      } else {
        // User is signed out
        // ...
        reject();
      }
    });
  })
}
// *

// * for handling new users
$('#signUp').click(signUpUser);
function signUpUser () {
  let firstName = $('#signup_firstName').val();
  let lastName = $('#signup_lastName').val();
  let email = $('#signup_Email').val();
  let password = $('#signup_Password').val();
  console.log("Load")
    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed in 
        const user = await userCredential.user;
      
        await set(ref(database, '/users/' + user.uid +'/Account'), {
          email: email,
          firstName: firstName,
          lastName: lastName
        })

        await redirect();

        console.log("Created User"); 
        // ...
      })
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('failed to create user');
        $('#errorAlertSignUp').show();
        // ..
      });
}
// *

// * for handling existing users
export function loginUser (email, password) {
  return new Promise (function (resolve, reject){ 
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      resolve();
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      reject();
    });
  })
}
// *

// * Sign out existing user
export function signOutUser() {
  return new Promise (function (resolve, reject){
    signOut(auth).then(() => {
      // Sign-out successful.
      resolve();
    }).catch((error) => {
      // An error happened.
      reject();
    });
  })
}

function redirect() {
  window.location.href = '/html/mainPage.html';
}