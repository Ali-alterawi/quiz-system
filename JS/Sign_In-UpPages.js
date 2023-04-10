class Users {

    constructor(email, userName, password, examType) {
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.examType = examType;
    }

    static signInCheck(email, password) {

        let arrUsers = Users.getUsersInfo();

        for (let index = 0; index < arrUsers.length; index++) {

            if (arrUsers[index].email === email) {
                if (arrUsers[index].password === password)
                    return arrUsers[index];
            }
        }
        return false;
    }

    static UserNamecheck(arrUsers, userName) {

        for (let index = 0; index < arrUsers.length; index++) {

            if (arrUsers[index].userName === userName) {
                return false;
            }
        }
        return true;
    }


    static UserEmailCheck(arrUsers, email) {
        for (let index = 0; index < arrUsers.length; index++) {

            if (arrUsers[index].email === email) {
                return false;
            }
        }
        return true;
    }

    // get Array Info To Users from localStorage
    static getUsersInfo() {

        try {
            return JSON.parse(localStorage.arrUsers);
        }
        catch (errMsg) {
            return [];
        }
    }

    // set Array Info To Users from localStorage
    static setUsersInfo(arrUsersKeyInLocalStorage, arrUsers) {
        localStorage.setItem(arrUsersKeyInLocalStorage, JSON.stringify(arrUsers));
    }

    getUser() {
        try {
            return JSON.parse(localStorage.user);
        }
        catch (errMsg) {
            return [];
        }
    }
}

/* End Sign Up Pages*/

const formSignUp = document.getElementById('formSignUp');
try {
    formSignUp.addEventListener('submit', event => {


        let newUser = new Users(
            event.target.email.value,
            event.target.userName.value,
            event.target.password.value,
            event.target.examType.value,
        )

        event.preventDefault();

        console.log(newUser);

        createNewUser(newUser);
    });
} catch (errMsg) { }

// 
function inputsRules(newUser) {

    // without spaces
    const patternUesrName = /^[A-z0-9]+$/;

    // more than 8 characters, with at least 1 number, uppercase, and special characters.
    const patternPassword = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;

    // follows email format
    const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;

    // console.log (!patternEmail.test(newUser.email),newUser.email, !patternUesrName.test(newUser.userName), newUser.userName,  !patternPassword.test(newUser.password), newUser.password)

    if (!patternEmail.test(newUser.email)) {

        // let warning = document.getElementById('warningEmail');
        // warning.textContent = 'Mistake Email';

        alert('⚠️ VALIDATION ERROR: Email Format is incorrect.');

        return false;
    }
    else if (!patternUesrName.test(newUser.userName)) {

        // let warning = document.getElementById('warningUserName');
        // warning.textContent = 'Mistake UesrName, UesrName it should be without spaces';
        console.log(patternUesrName.test(newUser.userName), newUser.userName)
        alert('⚠️ VALIDATION ERROR: UesrName should be without spaces.');

        return false;
    }
    else if (!patternPassword.test(newUser.password)) {

        // let warning = document.getElementById('warningPassword');
        // warning.textContent = 'Mistake Password, UesrName it should be more than 8 characters, with at least 1 number, uppercase, and special characters';

        alert('⚠️ VALIDATION ERROR: Password should be more than 8 characters, with at least 1 number, 1 Uppercase and Special character.');

        return false;
    }
    return true;
}

// 
function createNewUser(newUser) {

    let arrUsers = Users.getUsersInfo();

    const resultInputRulse = inputsRules(newUser);

    let resultUserEmail = Users.UserEmailCheck(arrUsers, newUser.email);
    let resultUserName = Users.UserNamecheck(arrUsers, newUser.userName);


    console.log(resultUserName, resultUserEmail, resultInputRulse);

    if (resultUserName && resultUserEmail && resultInputRulse) {
        arrUsers.push(newUser);
        Users.setUsersInfo('arrUsers', arrUsers)
        window.location.href = "Sign_In.html";
        formSignUp.reset();
        return;
     }

     else if (!(resultUserName || resultUserEmail)) {
        if(!resultUserName)
        alert('⚠️ VALIDATION ERROR: Username is already exists or this email address is already registered. Please log in or use a different email address or username.');
    }
        
    formSignUp.reset();


    }

/* End Sign Up Pages*/

// --------------------------- //

/* Start Sign In Pages*/

const formSignIn = document.getElementById('form');
try {
    formSignIn.addEventListener('submit', event => {

        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        const user = Users.signInCheck(email, password);


        sessionStorage.setItem('UserSession', JSON.stringify(user));

        if (user) {
            window.location.href = "WelcomePage.html";
        }
        else {
            alert('❗️ Username or Password is wrong.')
        }
  
    });

} catch (errMsg) {}

/* End Sign In Pages*/


