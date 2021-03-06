// ! Do not copy paste to another project
// ! This initialization is only for this project
// Import the functions you need from the SDKs you need
// wag mo na iimport
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { getDatabase, ref, set, push} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js"

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
                window.location.href = '/';
            });

// *Proceed to the laternative thought entry page
$('#proceedToAlternative').click(redirectATJ);
function redirectATJ() {
    window.location.href = '/html/alternativeThoughtEntry.html';
}

// * Save automatic thought journal entry
$('#ATJSubmit').click(insertATJEntry);
function insertATJEntry() {
    FirebaseInit.checkActiveUser()
                .then((user) => {
                    let triggeringEvent = $('#triggeringEvent').val();
                    let automaticThoughts = $('#automaticThoughts').val();
                    let automaticFeelings = $('#automaticFeelings').val();
                    let automaticBehavior = $('#automaticBehavior').val();

                    // date
                    var today = new Date();
                    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();

                    function onlySpaces(val) {
                        return /^\s*$/.test(val);
                      }
                    
                    if(onlySpaces(triggeringEvent) === true){
                        alert("Error: Hindi pwedeng may bakante sa iyong entry.");
                    } else if(onlySpaces(automaticThoughts) === true){
                        alert("Error: Hindi pwedeng may bakante sa iyong entry.");
                    } else if(onlySpaces(automaticFeelings) === true){
                        alert("Error: Hindi pwedeng may bakante sa iyong entry.");
                    } else if(onlySpaces(automaticBehavior) === true){
                        alert("Error: Hindi pwedeng may bakante sa iyong entry.");
                    } else if(onlySpaces(triggeringEvent) === true && onlySpaces(automaticThoughts) === true){
                        alert("Error: Hindi pwedeng may bakante sa iyong entry.");
                    } else if(onlySpaces(triggeringEvent) === true && onlySpaces(automaticFeelings) === true){
                        alert("Error: Hindi pwedeng may bakante sa iyong entry.");
                    } else if(onlySpaces(triggeringEvent) === true && onlySpaces(automaticBehavior) === true){
                        alert("Error: Hindi pwedeng may bakante sa iyong entry.");
                    } else if(onlySpaces(automaticThoughts) === true && onlySpaces(automaticFeelings) === true){
                        alert("Error: Hindi pwedeng may bakante sa iyong entry.");
                    } else if(onlySpaces(automaticThoughts) === true && onlySpaces(automaticBehavior) === true){
                        alert("Error: Hindi pwedeng may bakante sa iyong entry.");
                    } else if(onlySpaces(automaticFeelings) === true && onlySpaces(automaticBehavior) === true){
                        alert("Error: Hindi pwedeng may bakante sa iyong entry.");
                    } else if(onlySpaces(automaticFeelings) === true && onlySpaces(automaticBehavior) === true && onlySpaces(automaticThoughts) === true && onlySpaces(triggeringEvent) === true){
                        alert("Error: Hindi pwedeng may bakante sa iyong entry.");
                    } else{
                        const postListRef = ref(database, 'users/' + user.uid +'/ATJEntries');
                        const newPostRef = push(postListRef);
                        const postID = newPostRef.key;
                        set(newPostRef, {
                            date: date,
                            triggeringEvent: triggeringEvent,
                            automaticThoughts: automaticThoughts,
                            automaticFeelings: automaticFeelings,
                            automaticBehavior:automaticBehavior,
                            postID: postID
                        });

                        alert("Matagumpay na nailagy nasa database ang iyong entry.")
                    }
                }, function() {
                    console.log('No user exists');
                });
}
// * Save automatic thought journal entry

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