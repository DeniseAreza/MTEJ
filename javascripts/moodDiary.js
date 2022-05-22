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
for (var i = 1; i <= 10; i++) {
    cell[i] = document.createElement('tr'); //row

    for (var j = 1; j <= daysInMonth+1; j++) {
        cell[i][j] = document.createElement('td'); //data
        cell[i][j].innerHTML = ""; //data
        cell[i].appendChild(cell[i][j]).setAttribute('id', 'row'+i+'day'+j); //row
    }
    tbody.appendChild(cell[i]); //row
}