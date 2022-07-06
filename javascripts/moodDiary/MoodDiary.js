// ! Do not copy paste to another project
// ! This initialization is only for this project
// Import the functions you need from the SDKs you need
// wag mo na iimport
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { getDatabase, ref, set, push, onChildAdded, onValue} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js"

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

import { addMoodEntry, collectMoodEntries } from "./DataCollection.js";
import { ChartJS } from "./Chart.js";
// Eto ung Add Entry na button
// Lahat ng basic functions na iinitiate dito
const addEntryBtn = $("#moodEntryUser");
const datePicker = $("#datepicker");
const timePicker = $("#timepicker");
const moodBtn = $(".col.mood");

var moodLevel = null;

/**
 * @description Initialize lahat ng mangyayari sa umpisa dito
 */

// Eto ung mga mangyayari sa umpisa
function init() {
    //eto naman ung iseset ung time ngaun sa input field
    const hourToday = new Date().getHours();
    const minuteToday = new Date().getMinutes();

    // Set Time Picker
    timePicker.datetimepicker({
        format: 'hh:mm a' //hh:mm:ss a
    })
    timePicker.val(hourToday + ":" + minuteToday);
    // Set Date Picker
    datePicker.datepicker();
    datePicker.val(new Date().toLocaleDateString());

    // OnClick Functions
    // Eto naman pagclinick yung Add Entry
    addEntryBtn.click(onEntryAdded);
    // Eto naman pagpumili yung user ng mood
    moodBtn.click(onMoodPick);

    displayChart();
}

/**
 * @description Kapag pumile yung user sa mood picker
 */


function onMoodPick(event) {
    const mood = event.currentTarget.attributes.value.value;
    // Iseset ung moodLevel sa taas na variable into kung anong pinile ng user
    moodLevel = mood;
}

/**
 * @description Kapag nagpasok ng entry ung user
 */
async function onEntryAdded() {
    const date = datePicker.val();
    const time = timePicker.val();

    // Dito yung mga magaganap pag nag add ka
    // Etong addMoodEntry na function nakuha ko sa DataCollection.js na file
    // Try mo CTRL+Click yung addMoodEntry
    const snapshot = await addMoodEntry(date, time, moodLevel);
    alert("Successfully Uploaded");
}


// * Read Mood Level
$("#moodEntry").on("click",".mood",function(){
    var mood= $(this).attr('value');
    document.getElementById("moodLevel").innerHTML = mood;
    document.getElementById("moodLevel").setAttribute("value", mood);
 });
 
/**
 * @description Display the Mood Chart
 */


function displayChart() {
    // * Read Values

    FirebaseInit.checkActiveUser()
                .then((user) =>{
                    const moodDiaryRef = ref(database, 'users/' + user.uid  + '/MoodEntry');
                    onChildAdded(moodDiaryRef, (value) => {
                        var moodLevel = value.val().moodLevel;
                        var date = value.val().date;
                        // var time = value.val().time;


                        var moodChart = [];
                        for (var i = 0; i < moodLevel.length; i++){
                            moodChart = moodLevel[i];
                        }

                        // //setup
                        // const data = {
                        //     labels: [date],
                        //     datasets: [{
                        //         label: 'My Mood',
                        //         data: [],
                        //         backgroundColor: [
                        //             'rgba(255, 99, 132, 0.2)',
                        //             'rgba(54, 162, 235, 0.2)',
                        //             'rgba(255, 206, 86, 0.2)',
                        //             'rgba(75, 192, 192, 0.2)',
                        //             'rgba(153, 102, 255, 0.2)',
                        //             'rgba(255, 159, 64, 0.2)'
                        //         ],
                        //         borderColor: [
                        //             'rgba(255, 99, 132, 1)',
                        //             'rgba(54, 162, 235, 1)',
                        //             'rgba(255, 206, 86, 1)',
                        //             'rgba(75, 192, 192, 1)',
                        //             'rgba(153, 102, 255, 1)',
                        //             'rgba(255, 159, 64, 1)'
                        //         ],
                        //         borderWidth: 1
                        //     }]
                        // };
                        // //config block
                        // const config = {
                        //     type: 'line',
                        //     data
                        // };
                        //init block
                        // const myChart = new Chart(document.getElementById('myChart'), config)

                        //array of months


                        const ctx = document.getElementById('myChart');
                        const myChart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: [date],
                                datasets: [{
                                    label: 'Level of Mood',
                                    data: [10,12,14,16,1,11,12,20,21,33],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: false
                                    }
                                }
                            }
                        });
                        
                    //    myChart.destroy();

                    //    myChart = new Chart(document.getElementById('myChart'), config)
                    })
                })
}

// Eto dito ko sinet
$(document).ready(init);



