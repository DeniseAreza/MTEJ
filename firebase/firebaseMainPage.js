// ! Do not copy paste to another project
// ! This initialization is only for this project
// Import the functions you need from the SDKs you need
// wag mo na iimport
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, deleteUser} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
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
                console.log(user.email);
                console.log(user.uid)
                console.log(user.emailVerified)
                if (user.emailVerified == false) {
                    logOutClicked();
                    alert('Please confirm your email');

                    setTimeout(() => {
                        alert("Tapos na ang limang minuto at hindi pa rin nakakapag-log in ang user sa website. Buburahin na ang registered account mula sa auth table ng database. Mangyaring mag-register muli at i-verify ang account at mag-log in")
                        
                        remove(ref(database, 'users/' + user.uid))
                        .then(() => {
                            console.log("Data removed successfully.")
                        })
                        .catch((error) => {
                            console.log("Error message:" + error)
                        })
                        
                        deleteUser(user).then(() => {
                            // User deleted.
                            console.log("Deleted User")
                          }).catch((error) => {
                            // An error ocurred
                            // ...
                          });
                      }, "300000")
                    
                }
            }, function() {
                console.log('No user exists'); 
            });

// * Retrieve Alternative behavior as reference
FirebaseInit.checkActiveUser()
                .then((user) => {
                    const ATJRef = ref(database, 'users/' + user.uid  + '/AlternativeJournalEntries');
                    onChildAdded(ATJRef, (data) => {
                        var alternativeBehavior = data.val().alternativeBehavior;
                        var date = data.val().date;
                        console.log(alternativeBehavior);
                        console.log(date);
                        $("#table_alternativeBehavior").prepend('<div class="container shadow-sm p-3 mb-5 bg-white rounded""><div class="text-justify"><p class="text-muted">'+ date +'</p></div><div class="text-justify"><p class="text-justify">'+ alternativeBehavior +'</p></div></div>');
                      })
                }, function() {
                    console.log('No user exists'); 
                    window.location.href = '/';
                });
// * Retrieve Alternative behavior as reference 

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
