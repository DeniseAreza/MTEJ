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
                console.log(user.email);
                console.log(user.uid)
            }, function() {
                console.log('No user exists'); 
            });

// * Retrieve Alternative behavior as reference
FirebaseInit.checkActiveUser()
                .then((user) => {
                    const ATJRef = ref(database, 'users/' + user.uid  + '/AlternativeJournalEntries');
                    onChildAdded(ATJRef, (data) => {
                        var alternativeBehavior = data.val().alternativeBehavior;
                        var date = data.val().date;
                        console.log(alternativeBehavior);
                        console.log(date);
                        $("#table_alternativeBehavior").prepend('<div class="container shadow-sm p-3 mb-5 bg-white rounded""><div class="text-justify"><p class="text-muted">'+ date +'</p></div><div class="text-justify"><p class="text-justify">'+ alternativeBehavior +'</p></div></div>');
                      })
                }, function() {
                    console.log('No user exists'); 
                    window.location.href = '/';
                });
// * Retrieve Alternative behavior as reference 

// * Log out
$('#signOutBtn').click(logOutClicked);
$('#signOutSidebarBtn').click(logOutClicked);
function logOutClicked() {
    FirebaseInit.signOutUser()
            .then(() => {
                window.location.href = '/';
                console.log('signed out')
            }, function() {
                console.log('not yet signed out');
            });
}
