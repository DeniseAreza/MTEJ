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

// Eto areza ung mga mangyayari sa umpisa
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

// Try mo mag add ng mood
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


/**
 * @description Display the Mood Chart
 */
function displayChart() {
    
    // Sample
    // Etong data na to is ung nasa baba ng chart
    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
    ];

    // Eto naman is yung buong chart
    const datasets = [
    {
        label: 'My First dataset', // Eto ung label sa taas 
        backgroundColor: 'rgb(255, 99, 132)', //Eto ung color ng mga bilog sa chart
        borderColor: 'rgb(255, 99, 132)', // Eto ung color ng line sa chart
        data: [0, 10, 5, 2, 20, 30, 45], // tas eto ung mga data na ipapasok mo sa chart
    },
    {
        label: 'My Second dataset',
        backgroundColor: 'black',
        borderColor: 'black',
        data: [0, 1, 5, 2, 10, 6, 21],
    }]

    const appendTo = document.getElementById("myChart");
    // ayun ahahhaha nasobrahan lang pala sa p xD
    ChartJS(labels, datasets, "line", appendTo);

}

// Eto dito ko sinet
$(document).ready(init);

