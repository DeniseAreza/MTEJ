// When About Us Button clicked
$('#aboutUsButton').click(aboutUsButton);
function aboutUsButton(){
    window.location.href = '/html/aboutUs.html';
}

// When Login Button clicked
$('#loginSidebarButton').click(loginButton);
function loginButton(){
    window.location.href = '/html/loginPage.html';
}

// When Login Navbar button clicked
$('#loginNavbarButton').click(loginButton);
function loginButton(){
    window.location.href = '/html/loginPage.html';
}

// When Register Button clicked
$('#registerButton').click(registerButton);
function registerButton(){
    window.location.href = '/html/registerPage.html';
}


// When Simulan Na Button clicked
$('#simulanNaButton').click(registerButton);
function registerButton(){
    window.location.href = '/html/registerPage.html';
}

// When Home Button clicked
$('#indexHomepageButton').click(indexHomepageButton);
function indexHomepageButton(){
    window.location.href = '/index.html';
}

//When AT Journal Button clicked
$('#ATJournalButton').click(ATJournalButton);
function ATJournalButton(){
    window.location.href = '/html/ATJPageInfo.html';
}

//When Mood Diary Button clicked
$('#moodDiaryButton').click(moodDiaryButton);
function moodDiaryButton(){
    window.location.href = '/html/moodDiaryPage.html';
}


// *Proceed to the laternative thought entry page
$('#proceedToATJ').click(redirectATJ);
function redirectATJ() {
    window.location.href = '/html/automaticThoughtJournal.html';
}