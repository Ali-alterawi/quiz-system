

class Users {

    constructor(email, userName, password, examType, confirmPassword) {
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.examType = examType;
        this.confirmPassword = confirmPassword;
    }

    static signInCheck(email, password) {
        let arrUsers = Users.getUsersInfo();
        let emailCheck = false;
        let passwordCheck = false;
        let checking = [];
        for (let index = 0; index < arrUsers.length; index++) {
            
            if (arrUsers[index].email === email) {
                emailCheck = true;
            }

                if (arrUsers[index].password === password)
                {
                    passwordCheck = true;
 
                }
                checking.push(arrUsers[index]);
                checking.push(emailCheck);
                checking.push(passwordCheck);

                return checking;
            }
  
        
       
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
            event.target.confirmPassword.value

        )

        event.preventDefault();

        warningE.textContent ='';
        warningP.textContent ='';
        warningEx.textContent ='';
        warningN.textContent ='';
        warningCp.textContent ='';


        emailBorder.style.border = '2px solid #1f14ee66';
        userNameBorder.style.border = '2px solid #1f14ee66';
        examborder.style.border = '2px solid #1f14ee66';
        passwordBorder.style.border = '2px solid #1f14ee66';
        passwordCon.style.border = '2px solid #1f14ee66';
        inputsRules(newUser);
     
        
    });
} catch (errMsg) { }


let warningE = document.getElementById('warningEmail');
let warningP = document.getElementById('warningPassword');
let warningN = document.getElementById('warningUserName');
let warningEx = document.getElementById('warningExam');
let warningCp = document.getElementById('warningConfirmPassword');
let emailBorder = document.getElementById('email');
let userNameBorder = document.getElementById('userName');
let examborder = document.getElementById('examType');
let passwordBorder = document.getElementById('password');
let passwordCon = document.getElementById('confirmPassword');

let arrUsers = Users.getUsersInfo();

// Validation Function
function inputsRules(newUser) {




    let resultUserEmail = Users.UserEmailCheck(arrUsers, newUser.email);
    let resultUserName = Users.UserNamecheck(arrUsers, newUser.userName);



    // without spaces
    const patternUesrName = /^[A-z0-9]+$/;

    // more than 8 characters, with at least 1 number, uppercase, and special characters.
    const patternPassword = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;

    // follows email format
    const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;

    // console.log (!patternEmail.test(newUser.email),newUser.email, !patternUesrName.test(newUser.userName), newUser.userName,  !patternPassword.test(newUser.password), newUser.password)

        if (newUser.email == ''){
            warningE.textContent = 'Email is required';
            emailBorder.style.border = '2px solid red';
            return false;
        }

        else if (!patternEmail.test(newUser.email)) {

            emailBorder.style.border = '2px solid red';
            warningE.textContent = 'Email Format is incorrect.';


            return false;
        }
        else if(!resultUserEmail){
            emailBorder.style.border = '2px solid red';
            warningE.textContent = 'This email address is already registered.';
        }

        else if(newUser.userName == ''){
            userNameBorder.style.border = '2px solid red';
            warningN.textContent = 'Username is required';
            return false;
        }

        else if (!patternUesrName.test(newUser.userName)) {

            userNameBorder.style.border = '2px solid red';
            warningN.textContent = 'UesrName should be without spaces.';
            console.log(patternUesrName.test(newUser.userName), newUser.userName);

            return false;
        }

        else if(!resultUserName){
            userNameBorder.style.border = '2px solid red';
            warningN.textContent = 'Username is already exists!';
        }

        else if(newUser.examType == "false"){
            examborder.style.border = '2px solid red';
            warningEx.textContent = 'Exam Type is required';
            return false;
        }

        else if(newUser.password == ''){
            passwordBorder.style.border = '2px solid red';
            warningP.textContent = 'Password is required';
            return false;
        }

        else if (!patternPassword.test(newUser.password)) {

            passwordBorder.style.border = '2px solid red';
            warningP.textContent = 'Password should be more than 8 characters, with at least 1 number, 1 Uppercase and Special character.';
            return false;
        }

        else if(newUser.password == ''){
            passwordCon.style.border = '2px solid red';
            warningP.textContent = 'Confirm Password';
            return false;
        }

        else if(newUser.password != newUser.confirmPassword) {
            passwordCon.style.border = '2px solid red';
            warningCp.textContent = 'Password mismatch';
            return false;
        }


        else{
            
            createNewUser(newUser);
        
            
        return true;
        }
}

// function take the user to the signIn page.
function createNewUser(newUser) {
    warningE.textContent ='';
    warningP.textContent ='';
    warningEx.textContent ='';
    warningN.textContent ='';
    warningCp.textContent ='';
 


  

        arrUsers.push(newUser);
        Users.setUsersInfo('arrUsers', arrUsers);
        alert("██▓▒░ ►▬ WELCOME TO QUIZTOPIA ▬◄ ░▒▓██");
        window.location.href = "Sign_In.html";
        return true;



          


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

        if(email == ''){
            emailBorder.style.border = '2px solid red';
            warningEm.textContent = 'Email is required';
        }

        else if(password == ''){
            passwordBorder.style.border = '2px solid red';
            warningP.textContent = 'Password is required';
        }

        const user = Users.signInCheck(email, password);
        console.log(user[0] && user[1] && user[2]);

        warningEm.textContent = '';
        warningPass.textContent = '';
        emailBorder.style.border = '2px solid #1f14ee66';
        passwordBorder.style.border = '2px solid #1f14ee66';

        
        sessionStorage.setItem('UserSession', JSON.stringify(user[0]));
        
        if (user[0] && user[1] && user[2]) {
            window.location.href = "WelcomePage.html";
        }
  else{
    if(!user[2])
    {passwordBorder.style.border = '2px solid red';
    warningP.textContent = 'Wrong Password';}

    else if(!user[1])
    {emailBorder.style.border = '2px solid red';
    warningEm.textContent = 'Wrong Email';}


}
    });

} catch (errMsg) {}

/* End Sign In Pages*/

let warningEm = document.getElementById('warningEmail');
let warningPass = document.getElementById('warningPassword');

