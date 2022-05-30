// ! Do not copy paste to another project
// ! This initialization is only for this project
// Import the functions you need from the SDKs you need
// wag mo na iimport
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { getDatabase, ref, set, push, onValue, onChildAdded} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js"

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

import * as FirebaseInit from '/firebase/firebaseInit.js';

// *Check if there's an active user
FirebaseInit.checkActiveUser()
            .then((user) => {
            }, function() {
                console.log('No user exists'); 
                window.location.href = '/';
            });

// * Log out
$('#signOutBtn').click(logOutClicked);
function logOutClicked() {
    FirebaseInit.signOutUser()
            .then(() => {
                window.location.href = '/';
                console.log('signed out')
            }, function() {
                console.log('not yet signed out');
            });
}


// * manage users retrieval
const ATJRef = ref(database, 'users/');
                    onChildAdded(ATJRef, (data) => {
                        var uid = data.val().Account.uid;
                        var firstName = data.val().Account.firstName;
                        var lastName = data.val().Account.lastName;
                        var email = data.val().Account.email;
                        var state = data.val().Account.state;

                        $("#table_allUsers").append("<tr><td>"+ uid +"</td><td>"+ firstName +"</td><td>"+ lastName +"</td><td>"+ email +"</td><td>"+ state +"</td><td><button type='button' class='btn btn-danger' id='deleteUserBtn' data-uid-type="+ uid +">Delete</button></td></tr>");
                        
                      })
// * Delete User funtion
$('body').on('click', '#deleteUserBtn', function () {
    const uid = document.getElementById('deleteUserBtn');
    alert(uid.getAttribute('data-uid-type'));
});
