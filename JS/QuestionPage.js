
/* start time */

function startTimer(duration, display) {

    let timer = duration;
    let minutes
    let seconds;


    clock = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        let tim = --timer;
        if (tim < 0) {

            display.textContent = minutes + ":" + seconds;
            clockTime = minutes + ":" + seconds;

            // Click the Submit button by forcing the user.
            // changeResult(result, 5, 0, clockTime);
            document.getElementById("stop").click();
            clearInterval(clock);
        }
    }, 1000);
}

let clockTime = "";
let clock;
let quizDuration = 60 * 0.1;
let stopbtn;

stopbtn = document.getElementById('stop');
display = document.getElementById('time');

// startTimer(quizDuration, display);


stopbtn.addEventListener('click', function () {
    clearInterval(clock);
    clockTime = display.textContent;
    console.log(clockTime);

    // Click the Submit button by the user.
    document.getElementById("stop").click();
});

function goToResultPage() {
    window.location.href = '../Pages/ResultPage.html';
}

/* end time */

class Questions {

    
    constructor(id, question, correctAnswer) {
        this.id = id;
        this.question = question;
        this.answer = correctAnswer;
    }

    static getQuestions(examType) {

        if (examType == "html") { // If statement used here because we have 3 conditions that we need to pass through it. This one if the user chose html

            return [
                { id: 1, question: 'What does HTML stand for?', correctAnswer: 'a', 
                 a: 'Hyper Text Markup Language', b: 'Hyperlinks and Text Markup Language', c: 'High Tech Markup Language'},
                { id: 2, question: 'Which HTML tag is used to create a line break?', correctAnswer: 'c', 
                 a: '<p>', b: '<hr>', c: '<br>'},
                { id: 3, question: 'Which HTML tag is used to create an unordered list?', correctAnswer: 'b', 
                 a: '<ol>', b: '<ul>', c: '<li>'},
                { id: 4, question: 'Which HTML tag is used to create an image?', correctAnswer: 'c', 
                 a: '<picture>', b: '<video>', c: '<img>'},
                { id: 5, question: 'Which HTML tag is used to create a hyperlink?', correctAnswer: 'a', 
                 a: '<a>', b: '<p>', c: '<h1>'}
            ];
        }
        else if (examType == "css") { // THis one if the user chose css

            return [
                { id: 1, question: 'Which CSS property is used to change the font size?', correctAnswer: 'b', 
                 a: 'text-align', b: 'font-size', c: 'color'},
                { id: 2, question: 'Which CSS property is used to change the background color of an element?', correctAnswer: 'b', 
                 a: 'background-color', b: 'color', c: 'border'},
                { id: 3, question: 'Which CSS property is used to set the margin around an element?', correctAnswer: 'c',
                  a: 'border', b: 'padding', c: 'margin' },
                { id: 4, question: 'Which CSS property is used to make text bold?', correctAnswer: 'b', 
                 a: 'text-decoration', b: 'font-weight', c: 'font-style'},
                { id: 5, question: 'Which CSS property is used to center an element horizontally?', correctAnswer: 'a', 
                 a: 'margin: auto;', b: 'text-align: center;', c: 'display: flex;'}
            ];

        }

        else if (examType == "javascript") { // This one if the user chose js and we used else if not else because the conditional is obligatory to pass through js

            return [
                { id: 1, question: 'Which keyword is used to declare a variable in JavaScript?', correctAnswer: 'c', 
                 a: 'const', b: 'let', c: 'var'},
                { id: 2, question: 'Which operator is used to compare two values in JavaScript?', correctAnswer: 'b', 
                 a: '!=', b: '==', c: '==='},
                { id: 3, question: 'Which method is used to add an element to the end of an array in JavaScript?', correctAnswer: 'b', 
                 a: 'shift()', b: 'push()', c: 'pop()'},
                { id: 4, question: 'Which method is used to remove the first element from an array in JavaScript?', correctAnswer: 'a', 
                 a: 'shift()', b: 'pop()', c: 'unshift()'},
                { id: 5, question: 'Which method is used to convert a string to an integer in JavaScript?', correctAnswer: 'c', 
                 a: 'toUpperCase()', b: 'toString()', c: 'parseInt() '}
            ];
        }
        return [];

    }

    static setAnswersInLocalStorage(arrQuestions) {
        localStorage.setItem('arrQuestions', JSON.stringify(arrQuestions));
    }

    static getAnswersFromLocalStorage() {
        return JSON.parse(localStorage.arrQuestions);
    }

    static getResults(Counter) {
        if (Counter <= 2) 
            return "Pass";
        return "Fail";
    }
}

let user = JSON.parse(sessionStorage.UserSession);


let counterQuestion = 1;
let counterNumber = 0;
let counterCorrectAnswer = 0;


const circles = document.querySelectorAll(".circle");
const SubmitButton = document.getElementById("stop");
const nextQuestion = document.getElementById("next");
SubmitButton.style.display = "none";
circles[counterNumber].classList.add("active");



let arrQuestions = Questions.getQuestions(user.examType);
Questions.setAnswersInLocalStorage(arrQuestions);

const questionForm = document.getElementById("questionForm");
let answersofUser = [];

questionForm.addEventListener("submit",  event => {

    let userAnswer = event.target.answers.value;
    answersofUser.push(userAnswer);
    localStorage.setItem("UserAnswers", answersofUser);
    if (userAnswer === '') {
        alert('You must choose an answer');
        return;
    }
        
    event.preventDefault();

    let quizQuestion = Questions.getAnswersFromLocalStorage();
    
    // if (quizQuestion[counterQuestion-1].correctAnswer === userAnswer)
    //     console.log(counterCorrectAnswer++);

    innerTextInElement (counterQuestion-1, quizQuestion);

    console.log(quizQuestion[counterQuestion-1], userAnswer, counterQuestion);

    if (counterNumber >= 4) {
        SubmitButton.style.display = "inline-block";
        nextQuestion.style.display = "none";
        return;
    }
    else {
        nextQuestion.style.display = "inline-block";
        SubmitButton.style.display = "none";
    }
    
    counterQuestion++;
    counterNumber++;

    circles[counterNumber].classList.remove("active");
    circles[counterNumber].classList.add("active");
});

function innerTextInElement (counter, quizQuestion) {

    let question = document.getElementById("question");
    let choiceA = document.getElementById("answerA");
    let choiceB = document.getElementById("answerB");
    let choiceC = document.getElementById("answerC");
    
    question.textContent = quizQuestion[counter].question;
    choiceA.textContent = quizQuestion[counter].a;
    choiceB.textContent = quizQuestion[counter].b;
    choiceC.textContent = quizQuestion[counter].c;
} 

window.addEventListener("load", (event) => {
    innerTextInElement(0, arrQuestions);
});


console.log(answersofUser);

class ExamResult {
    constructor ( QuestionsId, Questions, status, counterCorrectAnswers) {
        this.QuestionsId = QuestionsId;
        this.Questions = Questions;
        this.status = status;
        this.counterCorrectAnswers = counterCorrectAnswers;
    }

    static getStatus(){
        
    }
}

// let savedAnswers = Questions.getQuestions("html");
// let numofCorrectAnswers = 0;
// for(let i = 0; i < savedAnswers.length; i++){
//    if( sessionStorage.getItem("UserAnswers")[i] === savedAnswers[i].correctAnswer);
//     numofCorrectAnswers++;
// }


// console.log(numofCorrectAnswers);