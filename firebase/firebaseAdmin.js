// ! Do not copy paste to another project
// ! This initialization is only for this project
// Import the functions you need from the SDKs you need
// wag mo na iimport
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { getDatabase, ref, set, push, onValue, onChildAdded, remove} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js"

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
            }, function() {
                console.log('No user exists'); 
                window.location.href = '/';
            });

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



// * manage users retrieval
const UsersRef = ref(database, 'users/');
                    onChildAdded(UsersRef, (data) => {
                        var uid = data.val().Account.uid;
                        var firstName = data.val().Account.firstName;
                        var lastName = data.val().Account.lastName;
                        var email = data.val().Account.email;
                        var state = data.val().Account.state;

                        //Populate Table
                        $('#table_allUsers').prepend('<tr>'
                         + '<td>'+ firstName +'</td>'
                         + '<td>'+ lastName +'</td>'
                         + '<td>'+ email +'</td>'
                         + '<td>'+ state +'</td>'
                         + '<td> <button type="button" class="btn btn-outline-success" id="#viewUserModal" data-bs-toggle="modal" data-bs-target="#view' + uid + 'Modal"> <i class="fa-regular fa-eye"></i>  </button> '
                         + '</tr>'              
                         );

                        //View Modal
                        $('#table_allUsers').prepend(''
                        + '<div class="modal fade" id="view' + uid + 'Modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><h1 class="modal-title">View User Details</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">'
                        + '<div class="row"><div class="col-md-6"><label for="firstName" class="col-sm-3 col-form-label">First Name</label>'
                        + '<input type="text" class="form-control" id="view_firstName" placeholder="'+ firstName +'" readonly></div><div class="col-md-6"><label for="lastName" class="col-sm-3 col-form-label">Last Name</label>'
                        + '<input type="text" class="form-control" id="view_lastName" placeholder="'+ lastName +'" readonly></div></div><div class="row"><div class="col-md-6"><label for="email" class="col-sm-3 col-form-label">Email</label>'
                        + '<input type="text" class="form-control" id="view_email" placeholder="'+ email +'" readonly></div><div class="col-md-6"><label for="state" class="col-sm-3 col-form-label">State</label>'
                        + '<input type="text" class="form-control" id="view_state" placeholder="'+ state +'" readonly></div><div class="col-md-12"><label for="state" class="col-sm-3 col-form-label">Unique Identifier (UID)</label>'
                        + '<input type="text" class="form-control" id="view_state" placeholder="'+ uid +'" readonly></div></div></div>'
                        + '<div class="modal-footer"><button type="button" class="btn btn-danger" data-bs-dismiss="modal"> <i class="fa-solid fa-ban"></i> Close </button></div></div></div></div>');
                      })


// * manage users retrieval
const MoodUsersRef = ref(database, 'users/');
                    onChildAdded(MoodUsersRef, (data) => {
                        var uid = data.val().Account.uid;
                        var firstName = data.val().Account.firstName;
                        var lastName = data.val().Account.lastName;
                        var email = data.val().Account.email;
                        var state = data.val().Account.state;

                        const MDRef = ref(database, 'users/' + uid + '/MoodEntry');
                                    onChildAdded(MDRef, (data) => {
                                    var uid = data.val().uid
                                    var moodLevel = data.val().moodLevel; 
                                    var time = data.val().time;
                                    var date = data.val().date;
                                    var postID = data.val().postID;
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
                                    $('#retrieveMoodDiaryUsers').prepend('<tr>'
                                    + '<td>'+ firstName +' '+ lastName +'</td>'
                                    + '<td>'+ email +'</td>'
                                    + '<td>'+ moodLevel +'</td>'
                                    + '<td>'+ moodLevelDescription +'</td>'
                                    + '<td>'+ date +'</td>'
                                    + '<td>'+ time +'</td>'
                                    + '<td> <button type="button" class="btn btn-outline-success" id="#viewUserModal" data-bs-toggle="modal" data-bs-target="#view' + postID + 'Modal"> <i class="fa-regular fa-eye"></i>  </button> '
                                    + '</tr>'              
                                    );
                                    
                                    //View Modal
                                    $('#retrieveMoodDiaryUsers').prepend(''
                                    + '<div class="modal fade" id="view' + postID + 'Modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><h1 class="modal-title">View Mood Entry Details</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">'
                                    + '<div class="mb-3">'
                                    + '<label for="Name" class="form-label">Name</label>'
                                    + '<input type="ext" class="form-control" id="Name" placeholder="'+ firstName +' '+ lastName +'" readonly>'
                                    + '</div>'
                                    + '<div class="mb-3">'
                                    + '<label for="email" class="form-label">Email</label>'
                                    + '<input type="text" class="form-control" id="email" placeholder="'+ email +'" readonly>'
                                    + '</div>'
                                    + '<div class="row"><div class="col-md-6"><label for="moodLevel" class="col-sm-3 col-form-label">Mood Level</label>'
                                    + '<input type="text" class="form-control" id="view_moodLevel" placeholder="'+ moodLevel +'" readonly></div><div class="col-md-6"><label for="description" class="col-sm-3 col-form-label">Description</label>'
                                    + '<input type="text" class="form-control" id="view_description" placeholder="'+ moodLevelDescription +'" readonly></div></div><div class="row"><div class="col-md-6"><label for="dateMood" class="col-sm-3 col-form-label">Date</label>'
                                    + '<input type="text" class="form-control" id="view_date" placeholder="'+ date +'" readonly></div><div class="col-md-6"><label for="state" class="col-sm-3 col-form-label">Time</label>'
                                    + '<input type="text" class="form-control" id="view_time" placeholder="'+ time +'" readonly></div></div></div>'
                                    + '<div class="modal-footer"><button type="button" class="btn btn-danger" data-bs-dismiss="modal"> <i class="fa-solid fa-ban"></i> Close </button></div></div></div></div>');
                                })

                        
                    });
                      
// * Getting the UID per button
// $("#retrieveUsers").on("click",".timeUser",function(event){
//     var uid= $(this).attr('id'); // get uid through using id attribute
//     // window.location = "/html/adminMoodDiaryEntries.html?redirect=true";
//     uniqueID = uid;
// })