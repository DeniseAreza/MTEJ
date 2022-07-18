// ! Do not copy paste to another project
// ! This initialization is only for this project
// Import the functions you need from the SDKs you need
// wag mo na iimport
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
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
// * Log out

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

// * Retrieve Mood Diary Entries as reference
FirebaseInit.checkActiveUser()
                .then((user) => {
                    const MDRef = ref(database, 'users/' + user.uid  + '/MoodEntry');
                    onChildAdded(MDRef, (data) => {
                        var moodLevel = data.val().moodLevel; 
                        var time = data.val().time;
                        var date = data.val().date;
                        var postID = data.val().postID;
                        var moodLevelDescription;
                        
                        switch(moodLevel) {
                            case "10": moodLevelDescription = "Manic"; break;
                            case "9": moodLevelDescription = "Ecstasy"; break;
                            case "8": moodLevelDescription = "Elation"; break;
                            case "7": moodLevelDescription = "Happy"; break;
                            case "6": moodLevelDescription = "Content"; break;
                            case "5": moodLevelDescription = "Good"; break;
                            case "4": moodLevelDescription = "Meh"; break;
                            case "3": moodLevelDescription = "Low"; break;
                            case "2": moodLevelDescription = "Anxious"; break;
                            case "1": moodLevelDescription = "Depressed"; break;
                            case "0": moodLevelDescription = "Worst"; break;
                        }

                        $("#table_MoodDiaryEntries").prepend(
                              '<div class="col">' 
                            + '<div class="card m-1" style="width: 18rem;">'
                            + '<div class="card-body">'
                            + '<p class="card-title display-6">'+ date +'</p>'
                            + '<p class="text-muted">'+ time +'</p>'
                            + '<p class="card-text"><strong>Mood level:</strong> '+ moodLevel +'</p>'
                            + '<p class="card-text"><strong>Mood level description:</strong> '+ moodLevelDescription +'</p>'
                            + '</div>'
                            + '</div>'
                            + '</div>');
                        });
                }, function() {
                    console.log('No user exists'); 
                });
// * Retrieve  ATJ as reference