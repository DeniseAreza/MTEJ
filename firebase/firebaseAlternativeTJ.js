// ! Do not copy paste to another project
// ! This initialization is only for this project
// Import the functions you need from the SDKs you need
// wag mo na iimport
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { getDatabase, ref, set, push, onChildAdded} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js"

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


// *Proceed to the alternative thought entry
$('#proceedToAlternative').click(redirectATJ);
function redirectATJ() {
    window.location.href = '/html/alternativeThoughtEntry.html';
}

// * Save automatic thought journal entry
$('#saveAlternativeJournalEntry').click(insertAlternativeJEntry);
function insertAlternativeJEntry() {
    FirebaseInit.checkActiveUser()
                .then((user) => {
                    let alternativeThoughts = $('#alternativeThoughts').val();
                    let alternativeFeelings = $('#alternativeFeelings').val();
                    let alternativeBehavior = $('#alternativeBehavior').val();

                    // date
                    var today = new Date();
                    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();

                    const postListRef = ref(database, 'users/' + user.uid +'/AlternativeJournalEntries');
                    const newPostRef = push(postListRef);
                    set(newPostRef, {
                        date: date,
                        alternativeThoughts: alternativeThoughts,
                        alternativeFeelings: alternativeFeelings,
                        alternativeBehavior:alternativeBehavior
                    });

                    alert("Successfully Uploaded")
                }, function() {
                    console.log('No user exists'); 
                });
}
// * Save automatic thought journal entry

// * Retrieve ATJ as reference
FirebaseInit.checkActiveUser()
                .then((user) => {
                    const ATJRef = ref(database, 'users/' + user.uid  + '/ATJEntries');
                    onChildAdded(ATJRef, (data) => {
                        var automaticThoughts = data.val().automaticThoughts; 
                        var automaticFeelings = data.val().automaticFeelings;
                        var automaticBehavior = data.val().automaticBehavior;
                        document.getElementById('automaticThought').innerHTML = automaticThoughts;
                        document.getElementById('automaticFeeling').innerHTML = automaticFeelings;
                        document.getElementById('automaticBehavior').innerHTML = automaticBehavior;
                      });
                }, function() {
                    console.log('No user exists'); 
                });
// * Retrieve  ATJ as reference

// * return to homepage
$('#returnToHomePage').click(returnToHomePage);
function returnToHomePage() {
    window.location.href = '/html/mainPage.html';
}

// * return to homepage
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