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

    // Set Time Picker
    timePicker.datetimepicker({ format: 'hh:mm A'}); //hh:mm:ss when clicking
    timePicker.val(moment(new Date()).format('hh:mm A'));  //automatically
    
    // Set Date Picker
    datePicker.datepicker({ format: 'yyyy/mm/dd', endDate: new Date(), startDate: new Date(2021, 12, 1) }); //use date picker (end date & startdate for limitations)
    datePicker.val(new Date().toLocaleDateString('en-ZA')); //automatic set (ja-JP "2012/4/20") (en-ZA "2012/04/20") (en-GB if "04/20/2012") 

    // BTN OnClick Functions: 
    addEntryBtn.click(onEntryAdded); //eto naman pagclinick yung Add Entry
    moodBtn.click(onMoodPick);      // eto naman pagpumili yung user ng mood
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
    if (moodLevel == null) {
        alert("Error: May laman dapat ang mood level.");
    } else {
        const snapshot = await addMoodEntry(date, time, moodLevel);
        alert("Successfully Uploaded");
    }
}


// * Read Mood Level
$("#moodEntry").on("click",".mood",function(){
    var mood= $(this).attr('value');
    document.getElementById("moodLevel").innerHTML = mood;
    document.getElementById("moodLevel").setAttribute("value", mood);
 });

 // Eto dito ko sinet
$(document).ready(init);

/**********************************************************************
    A. Initilize chart function: CHART LOGISTICS STARTS HERE!!! 
-----------------------------------------------------------------------*/
function initializeChart(chartID) {
    
    //get HTML element ID to instantiate chart ctx
    const ctx = document.getElementById(chartID).getContext('2d');

    /*------------------------
        B. Fill Data
    ------------------------*/
    const moodData = {
        labels: [],
        datasets: [{
            label: 'Mood Level',
            data: [],
            borderWidth: 5,
            segment: {
                //change borline line color depending on mood
                borderColor: 
                        ctx => ctx.p1.parsed.y == 10 ? 'rgba(255, 0, 0, 1)' : undefined
                    ||  ctx.p1.parsed.y == 9 ? 'rgba(192, 0, 0, 1)' : undefined
                    ||  ctx.p1.parsed.y == 8 ? 'rgba(255, 204, 0, 1)' : undefined
                    ||  ctx.p1.parsed.y == 7 ? 'rgba(191, 144, 0, 1)' : undefined
                    ||  ctx.p1.parsed.y == 6 ? 'rgba(255, 156, 25, 1)' : undefined
                    ||  ctx.p1.parsed.y == 5 ? 'rgba(0, 176, 80, 1)' : undefined
                    ||  ctx.p1.parsed.y == 4 ? 'rgba(6, 189, 208, 1)' : undefined
                    ||  ctx.p1.parsed.y == 3 ? 'rgba(0, 112, 192, 1)' : undefined
                    ||  ctx.p1.parsed.y == 2 ? 'rgba(112, 48, 160, 1)' : undefined
                    ||  ctx.p1.parsed.y == 1 ? 'rgba(32, 56, 100, 1)' : undefined
                    ||  ctx.p1.parsed.y == 0 ? 'rgba(0, 0, 0, 1)' : undefined
            }
        }]
    }


    /*----------------------------------------
        C. CREATE CHART, FILL LABEL OPTIONS
    ------------------------------------------*/
    const myChart = new Chart(ctx, {
        type: 'line',
        data: moodData,
        options: { 
            scales: { 
                //FILL Y-AXIS (LEFT) DESCRIPTION
                y: { 
                    suggestedMin: 0, 
                    suggestedMax: 10,
                    title: { display: true, text: 'Mood Level' },
                }, 
                //FILL X-AXIS DESCRIPTION
                x: {
                    title: { display: true, text: 'Date Created' }
                },
                //FILL Y-AXIS (RIGHT) DESCRIPTION
                description: {
                    suggestedMin: 0, 
                    suggestedMax: 10,
                    position: 'right',
                    title: { display: true, text: 'Mood Description' },
                    ticks: {
                        callback: function(value,index) {
                            console.log(this.getLabelForValue(value))
                            switch(this.getLabelForValue(value)) {
                                case "10": return "Elevated"; break;
                                case "9": return "Euphoric"; break;
                                case "8": return "Blissful"; break;
                                case "7": return "Happy"; break;
                                case "6": return "Content"; break;
                                case "5": return "Good"; break;
                                case "4": return "Meh"; break;
                                case "3": return "Low"; break;
                                case "2": return "Sad"; break;
                                case "1": return "Depressed"; break;
                                case "0": return "Worst"; break;
                            }
                        }
                    }
                }
            } 
        }
    });

    /**********************
       RETURN CHART VALUE 
     ---------------------*/
     return myChart;
}


/****************************
 * Display the Mood Chart
 ---------------------------*/
FirebaseInit.checkActiveUser()
                .then((user) => {


                    //INITILIZE CHART AND ARRAYS
                    const myChart = initializeChart("moodDayChart");
                    const myAllChart = initializeChart("moodAllChart");
                    
                    const dateArray1 = [];
                    const timeArray1 = [];
                    const moodLevelArray1 = [];
                
                    const dateArray2 = [];
                    const timeArray2 = [];
                    const moodLevelArray2 = [];


                    /*------------------------
                        D. RETRIEVE DATA
                     ------------------------*/
                    const moodDiaryRef = ref(database, 'users/' + user.uid  + '/MoodEntry');
                    onChildAdded(moodDiaryRef, (data) => {
                        
                        //retrieve data variables
                        var moodDate = data.val().date;
                        var moodTime = data.val().time;
                        var moodLevel = data.val().moodLevel; 
                        //var postID = data.val().postID;

                        //filterDuplicate
                        filterDuplicate(myChart, moodDate, moodTime, moodLevel, dateArray1, timeArray1, moodLevelArray1, true);
                        filterDuplicate(myAllChart, moodDate, moodTime, moodLevel, dateArray2, timeArray2, moodLevelArray2, false);    
                        

                        //TESTING PURPOSES
                        testTable(moodDate, moodTime, moodLevel);           // test all data

                        document.getElementById("demoDate").innerHTML = dateArray1;
                        document.getElementById("demoTime").innerHTML = timeArray1;
                        document.getElementById("demoMoodLevel").innerHTML = moodLevelArray1;
                    });
                    
                }, function() {
                    console.log('No user exists'); 
                });
// * Retrieve  ATJ as reference

/****************************
 *  E. ADD CHART DATA    *
 *--------------------------*/
function addChartData(myChart, moodDate, moodLevel) {
    myChart.data.labels.push(moodDate);
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(moodLevel);
    });
    myChart.update();
}

/****************************
 *  F. UPDATE CHART DATA    *
 *--------------------------*/
function updateChartData(myChart, newMoodLevel, index) {
    myChart.data.datasets.forEach((dataset) => {
        dataset.data[index] = newMoodLevel;
    });
    myChart.update();
}

/****************************
 *  G. FILTER ARRAYS         *
 *--------------------------*/

function filterDuplicate(myChart, moodDate, moodTime, moodLevel, dateArray, timeArray, moodLevelArray, isFilterChecked) {
    
    //get duplicate index
    var dupIndex = dateArray.indexOf(moodDate);  
    
    if (isFilterChecked == true) {
        //check duplicates
        if (dupIndex == -1) { //if there's NO duplicates

            //push data to array
            dateArray.push(moodDate);
            timeArray.push(moodTime);
            moodLevelArray.push(Math.trunc(moodLevel));

            //E. Populate Chart Data by updating
            addChartData(myChart, moodDate, moodLevel); 
        } else { 

            //computations: if duplicate found, then compute average mood level
            let sum = Math.trunc(moodLevel) + moodLevelArray[dupIndex];
            let average = sum / 2;
            average = Math.round(average); //round off average

            //change duplicate value to average then UPDATECHART
            moodLevelArray[dupIndex] = average;
            updateChartData(myChart, average, dupIndex);
        }
    } else { //else, add chart normally if "isFilterChecked" != true
        addChartData(myChart, moodDate, moodLevel); 
    }
    
}
    
      
/******************************************
 * TESTING PURPOSES: REMOVE WHEN DONE!!
 *----------------------------------------*/
function testTable(moodDate, moodTime, moodLevel) {

    var moodLevelDescription;
    
     switch(moodLevel) {
        case "10": moodLevelDescription = "Elevated"; break;
        case "9": moodLevelDescription = "Euphoric"; break;
        case "8": moodLevelDescription = "Blissful"; break;
        case "7": moodLevelDescription = "Happy"; break;
        case "6": moodLevelDescription = "Content"; break;
        case "5": moodLevelDescription = "Good"; break;
        case "4": moodLevelDescription = "Meh"; break;
        case "3": moodLevelDescription = "Low"; break;
        case "2": moodLevelDescription = "Sad"; break;
        case "1": moodLevelDescription = "Depressed"; break;
        case "0": moodLevelDescription = "Worst"; break;
    }

    //Populate Table
    $('#table_moodDiary').prepend('<tr>'
    + '<td>'+ moodDate +'</td>'
    + '<td>'+ moodTime +'</td>'
    + '<td>'+ moodLevel + " – " + moodLevelDescription + '</td>'
    + '</tr>'              
    );
}