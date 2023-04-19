function getUser() {
    return JSON.parse(sessionStorage.UserSession);
}

function appendUserName(user, idElement) {

    let element = document.getElementById(idElement);
    element.textContent = user.userName;
}


try {
    let user = getUser();
    console.log(user);
    appendUserName(user, 'heroName');

} catch (errMsg) {
    alert('You Must Sign in To open this page!');
    window.location.href = '../Pages/Sign_In.html';
}


