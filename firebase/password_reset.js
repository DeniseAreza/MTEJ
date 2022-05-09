import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";


var email = $("#email").val();

const auth = getAuth();
$("#reset-password-btn").click(sendPasswordResetEmail);
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

