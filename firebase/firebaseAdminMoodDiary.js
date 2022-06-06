// ! Do not copy paste to another project
// ! This initialization is only for this project
// Import the functions you need from the SDKs you need
// wag mo na iimport
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { getDatabase, ref, set, push, onChildAdded} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js"

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
// * Check if there's an active user

/* (test lang ito kaso ayaw gumawa :'))) tinatry ko kanina pa AAAAAAAa)
// GET ALL DATA 
function SelectAllData() {
    app.database().ref('ATJEntries').once('value', 
    function(AllRecords){
        AllRecords.forEach(
            function(CurrentRecord){
                var automaticThoughts = CurrentRecord.val().automaticThoughts; 
                var automaticFeelings = CurrentRecord.val().automaticFeelings;
                var automaticBehavior = CurrentRecord.val().automaticBehavior;
                var date = CurrentRecord.val().date;
                var postID = CurrentRecord.val().postID;
                AddItemsToTable(automaticThoughts, automaticFeelings, automaticBehavior, date, postID);
            }
        );
    });
}

window.onload = SelectAllData;

//FILLING THE TABLE
var moodNo = 0;
function AddItemsToTable(automaticThoughts, automaticFeelings, automaticBehavior, date, postID) {
    var tbody = document.getElementById('tableBodyMoodDiary');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    
    //on each td, populate the date
    td1.innerHTML = ++moodNo;
    td2.innerHTML = automaticThoughts;
    td3.innerHTML = automaticFeelings;
    td4.innerHTML = automaticBehavior;
    td5.innerHTML = date;
    td6.innerHTML = postID;

    //on tr, add the populated td
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);

    //on tbody, add trow
    tbody.appendChild(trow);
}
*/