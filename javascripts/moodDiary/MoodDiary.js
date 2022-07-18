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
    function onlySpaces(val) {
        return /^\s*$/.test(val);
      }
    
    if(onlySpaces(date) === true){
        alert("Error: Hindi dapat bakante ang petsa.");
    } else if (onlySpaces(time) === true){
        alert("Error: Hindi dapat bakante ang oras.");
    } else if (moodLevel === null || onlySpaces(moodLevel) == true){
        alert("Error: Hindi dapat bakante ang antas ng mood.");
    } else if (onlySpaces(time) === true && onlySpaces(date) === true){
        alert("Error: Hindi dapat bakante ang petsa at oras.");
    } else if (onlySpaces(time) === true && moodLevel === null){
        alert("Error: Hindi dapat bakante ang oras at antas ng mood.");
    } else if (onlySpaces(date) === true && moodLevel === null){
        alert("Error: Hindi dapat bakante ang date at antas ng mood.");
    } else if(onlySpaces(date) === true && moodLevel === null && onlySpaces(time) === true){
        alert("Error: Hindi dapat bakante ang petsa, oras at antas ng mood.");
    } else{
        const snapshot = await addMoodEntry(date, time, moodLevel);
        alert("Matagumpay na nailagay ang iyong entry sa database.");
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
    // set the fill color to white
    
    /*------------------------
        B.1 Fill Data
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
                    ||  ctx.p1.parsed.y == 8 ? 'rgba(191, 144, 0, 1)' : undefined
                    ||  ctx.p1.parsed.y == 7 ? 'rgba(255, 204, 0, 1)' : undefined
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

    /*--------------------------------------
        B.2 create plugin and colors
    ----------------------------------------*/
    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
    };

    const colors = ['rgba(0, 0, 0, 1)',         //worst
                    'rgba(32, 56, 100, 1)',     //depressed
                    'rgba(112, 48, 160, 1)',    //anxious
                    'rgba(0, 112, 192, 1)',     //low
                    'rgba(6, 189, 208, 1)',     //meh
                    'rgba(0, 176, 80, 1)',      //good
                    'rgba(255, 156, 25, 1)',    //content
                    'rgba(255, 204, 0, 1)',     //happy
                    'rgba(191, 144, 0, 1)',     //elation
                    'rgba(192, 0, 0, 1)',       //ecstasy
                    'rgba(255, 0, 0, 1)'];      //manic
    
    /*----------------------------------------
        C. CREATE CHART, FILL LABEL OPTIONS
    ------------------------------------------*/
    const myChart = new Chart(ctx, {
        type: 'line',
        data: moodData,
        plugins: [plugin],
        options: {
            responsive: true,
            title:{
                display:true,
                text:'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: { 
                //FILL Y-AXIS (LEFT) DESCRIPTION
                y: { 
                    suggestedMin: 0, 
                    suggestedMax: 10,
                    title: { display: true, text: 'Mood Level' },
                    ticks: { color: (c) => { return colors[c.index % colors.length] } }
                }, 
                //FILL X-AXIS DESCRIPTION
                x: {
                    title: { display: true, text: 'Date Created' },
                    //ticks: { color: (c) => { return colors[c.index % colors.length] } }
                },
                //FILL Y-AXIS (RIGHT) DESCRIPTION
                description: {
                    suggestedMin: 0, 
                    suggestedMax: 10,
                    position: 'right',
                    title: { display: true, text: 'Mood Description' },
                    ticks: {
                        //change tick color individually
                        color: (c) => { return colors[c.index % colors.length] },   
                        //add tick description
                        callback: function(value, index, values) {                            
                            console.log(this.getLabelForValue(value))
                            switch(this.getLabelForValue(value)) {
                                case "10": return "Manic"; break;
                                case "9": return "Ecstasy"; break;
                                case "8": return "Elation"; break;
                                case "7": return "Happy"; break;
                                case "6": return "Content"; break;
                                case "5": return "Good"; break;
                                case "4": return "Meh"; break;
                                case "3": return "Low"; break;
                                case "2": return "Anxious"; break;
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
                    });
                    
                }, function() {
                    console.log('No user exists'); 
                });
// * Retrieve  ATJ as reference


/****************************
 *  E. ADD NEW CHART DATA   *
 *--------------------------*/
function addChartData(myChart, moodDate, moodLevel) {
    myChart.data.labels.push(moodDate);
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(moodLevel);
    });

    // duplicate array for sorting
    let labels = myChart.data.labels;
    let moodLevelArray = myChart.data.datasets[0].data;
    
    // sort data and label
    var isDone = false;
    while (!isDone) {
        isDone = true;
        
        //sort through label
        for (var i = 1; i <= labels.length; i++) {
            if (labels[i-1] > labels[i]) {
                isDone = false;

                //sort label
                var tmp = labels[i-1];
                labels[i-1] = labels[i];
                labels[i] = tmp;

                //sort data
                tmp = moodLevelArray[i-1];
                moodLevelArray[i-1] = moodLevelArray[i];
                moodLevelArray[i] = tmp;
            }
        }
    }

    //update chart
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
    

/****************************
 *  H. SAVE CHART AS IMAGE         *
 *--------------------------*/

$("#saveImageChartDaytoDay").click(saveChartAsImageDaytoDay);
function saveChartAsImageDaytoDay() {
    const imageLink = document.createElement('a');
    const canvas = document.getElementById('moodDayChart');
    imageLink.download = 'MoodDiaryDaytoDay.jpg'
    imageLink.href = canvas.toDataURL('image/jpeg', 1);

    imageLink.click();
}

$("#saveImageAllEntries").click(saveChartAsImageAllEntries);
function saveChartAsImageAllEntries() {
    const imageLink = document.createElement('a');
    const canvas = document.getElementById('moodAllChart');
    imageLink.download = 'MoodDiaryAllEntries.jpg'
    imageLink.href = canvas.toDataURL('image/jpeg', 1);

    imageLink.click();
}