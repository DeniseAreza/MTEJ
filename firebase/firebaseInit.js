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