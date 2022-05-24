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
/*-----------------------------
    TABLE
 -----------------------------*/
//create table, table head, and table body
let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

// Adding the entire table to the moodTable tag
document.getElementById('moodTable').appendChild(table);

//Set Date
var moodDate = new Date();
var year   = moodDate.getFullYear();
var month  = moodDate.getMonth(); 
var daysInMonth = new Date(year, month, 0).getDate();
//var dates  = moodDate.daysInMonth(year, month);

// Creating and adding data to HEADER of the table
let tableHeader = document.createElement('tr');
let heading = [];
for (var i = 1; i <= daysInMonth+1; i++) {
    heading[i] = document.createElement('th');
    heading[i].innerHTML = i;
    tableHeader.appendChild(heading[i]);
}
thead.appendChild(tableHeader);


// Creating and adding data to BODY of the table
let cell = [[]]; //multidimentional array 
for (var i = 0; i <= 10; i++) {
    cell[i] = document.createElement('tr'); //row

    for (var j = 1; j <= daysInMonth+1; j++) {
        cell[i][j] = document.createElement('td'); //data
        cell[i][j].innerHTML = ""; //data
        cell[i].appendChild(cell[i][j]).setAttribute('id', 'row'+i+'day'+j); //row
    }
    tbody.appendChild(cell[i]); //row
}

/*-----------------------------
    MODAL
 -----------------------------*/
 $(document).ready(function () {
    $('#datepicker').datepicker();
});

var time = moodDate.getHours() + ":" + moodDate.getMinutes(); //":" + moodDate.getSeconds()

$('#timepicker').datetimepicker({
    format: 'hh:mm a' //hh:mm:ss a
});

document.getElementById('timepicker').value = time;










/*
entry1 = 5
entry2 = 4
entry3 = 6
entry4 = 5
totalEntry = (entry1 + entry2 + entry3 + entry 4)

numberOfEntries = 4 //nakadepende sa how many entries yung computation
average = totalEntry / 4;

#row[average]day[day] = backgroundColor(row0Color);

for (var i = 0; i <= 10; i++) {
    parang hahanapin niya sa cell
    
    for (var j = 1; j <= daysInMonth+1; j++) {
        cell[i][j].innerHTML = ""; //data
        cell[i].appendChild(cell[i][j]).setAttribute('id', 'row'+i+'day'+j); //row
    }
    tbody.appendChild(cell[i]); //row
}

row0Color = darkest red;
row1Color = dark red*/