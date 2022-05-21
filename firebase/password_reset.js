import * as FirebaseInit from '/firebase/firebaseInit.js';
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

// *Check if there's an active user
FirebaseInit.checkActiveUser()
            .then((user) => {
                console.log(user.email);
                console.log(user.uid)
            }, function() {
                console.log('No user exists'); 
            });

const auth = getAuth();
$("#reset-password-btn").click(resetPassword);
function resetPassword() {
  var email = $("#login_InputEmail").val();
  sendPasswordResetEmail(auth, email)
  .then(() => {
    
    window.alert("Password reset email sent successfully!");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    window.alert(errorMessage);
  });

}


