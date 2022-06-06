
let x = document.forms["registerForm"]["signup_Password"].value;
let y = document.forms["registerForm"]["signup_confirmPassword"].value;
if (x == "" && y=='') {
    alert("Password must be filled out");

}else if (x!=y) {
    alert("Passwords must match");
}

