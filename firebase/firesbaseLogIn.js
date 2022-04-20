// *Main Page Manger

import * as FirebaseInit from '/firebase/firebaseInit.js';

// *Check if there's an active user
FirebaseInit.checkActiveUser()
            .then(() => {
                console.log('successfully logged in');
            }, function() {
                console.log('No user exists'); 
            });

// * Sign in of user
$('#submitbtnLogin').click(signIn);
function signIn () {
    let userEmail = $('#login_InputEmail').val();
    let userPassword = $('#login_InputPassword').val();
    FirebaseInit.loginUser (userEmail, userPassword)
                .then(() => {
                    window.location.href = "/html/mainPage.html";
                    console.log("Logged in");
                }, function() {
                    $('#errorAlertLogin').show();
                    console.log('failed to log in');
                })
    
}
