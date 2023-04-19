/* start time */

let clockTime = "";
let clock;
let quizDuration = 60 * 1;

function startTimer(duration, display) {

    let timer = duration;
    let minutes;
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


            StopTimer();
            clearInterval(clock);

        }
    }, 1000);
}

display = document.getElementById('time');

startTimer(quizDuration, display);

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
}

let user = JSON.parse(sessionStorage.UserSession);


let counterQuestion = 0;
let score = 0;

let counterNumber = 0;
let counterCorrectAnswer = 0;


const circles = document.querySelectorAll(".circle");
circles[counterNumber].classList.add("active");

const nextQuestion = document.getElementById("next");

let arrQuestions = Questions.getQuestions(user.examType);
Questions.setAnswersInLocalStorage(arrQuestions);

function loadQuiz () {
    const questions = arrQuestions[counterQuestion];

    let question = document.getElementById("question");
    let choiceA = document.getElementById("answerA");
    let choiceB = document.getElementById("answerB");
    let choiceC = document.getElementById("answerC");
    
    question.textContent = questions.question;
    choiceA.textContent = questions.a;
    choiceB.textContent = questions.b;
    choiceC.textContent = questions.c;
}

function getSelected () {
    const answersElement = document.querySelectorAll(".input");

    let answer = undefined;

    answersElement.forEach( (answerElement) => {
        if (answerElement.checked) {
            answer = answerElement;
        }
    });

    return answer;
}

loadQuiz ();

let arrAnswers = [];

nextQuestion.addEventListener("click",  event => {

    event.preventDefault();

    const answer = getSelected();

    let answerValue = answer.value;

    if (answer) {
        
        if (answer.id === arrQuestions[counterQuestion].correctAnswer) {
            
            if(answerValue === 'a') {
                arrAnswers.push(
                    {id: arrQuestions[counterQuestion].id,
                    question: arrQuestions[counterQuestion].question,
                    UserAnswer: arrQuestions[counterQuestion].a, status: true
                });
            }
            else if (answerValue === 'b') {
                arrAnswers.push(
                    {id: arrQuestions[counterQuestion].id,
                    question: arrQuestions[counterQuestion].question,
                    UserAnswer: arrQuestions[counterQuestion].b, status: true
                });
            }
            else if (answerValue === 'c') {
                arrAnswers.push(
                    {id: arrQuestions[counterQuestion].id,
                    question: arrQuestions[counterQuestion].question,
                    UserAnswer: arrQuestions[counterQuestion].c, status: true
                });
            }
        }
        else {

            if(answerValue === 'a') {
                arrAnswers.push(
                    {id: arrQuestions[counterQuestion].id,
                    question: arrQuestions[counterQuestion].question,
                    UserAnswer: arrQuestions[counterQuestion].a, status: false
                });
            }
            else if (answerValue === 'b') {
                arrAnswers.push(
                    {id: arrQuestions[counterQuestion].id,
                    question: arrQuestions[counterQuestion].question,
                    UserAnswer: arrQuestions[counterQuestion].b, status: false
                });
            }
            else if (answerValue === 'c') {
                arrAnswers.push(
                    {id: arrQuestions[counterQuestion].id,
                    question: arrQuestions[counterQuestion].question,
                    UserAnswer: arrQuestions[counterQuestion].c, status: false
                });
            }
        }
        
        
        counterQuestion++;

        if (counterQuestion < arrQuestions.length) {
            loadQuiz();
        }
        else {
            StopTimer();
        }
    }

    counterNumber++;

    circles[counterNumber].classList.remove("active");
    circles[counterNumber].classList.add("active");
});

function StopTimer(){

    let user_results = {result: '', correctAnswer: 0, incorrectAnswer: 0};

    arrAnswers.forEach( element => {
        if(element.status)
            user_results.correctAnswer++
        else
            user_results.incorrectAnswer++
    });

    if (user_results.correctAnswer >= 3)
        user_results.result = "pass";
    else
        user_results.result = "fail";

    sessionStorage.setItem('UserInformations', JSON.stringify(arrAnswers));
    sessionStorage.setItem('UserInformationsResult', JSON.stringify(user_results));

    clearInterval(clock);
    window.location.href = '../Pages/ResultPage.html'; 
}