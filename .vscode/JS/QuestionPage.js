
/* start time */

let clockTime = "";
let clock;
let quizDuration = 60 * 5;

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


            stopTimer();
            clearInterval(clock);

        }
    }, 1000);
}

display = document.getElementById('time');


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
                {
                    id: 1, question: 'What does HTML stand for?', correctAnswer: 'a',
                    a: 'Hyper Text Markup Language', b: 'Hyperlinks and Text Markup Language', c: 'High Tech Markup Language'
                },
                {
                    id: 2, question: 'Which HTML tag is used to create a line break?', correctAnswer: 'c',
                    a: '<p>', b: '<hr>', c: '<br>'
                },
                {
                    id: 3, question: 'Which HTML tag is used to create an unordered list?', correctAnswer: 'b',
                    a: '<ol>', b: '<ul>', c: '<li>'
                },
                {
                    id: 4, question: 'Which HTML tag is used to create an image?', correctAnswer: 'c',
                    a: '<picture>', b: '<video>', c: '<img>'
                },
                {
                    id: 5, question: 'Which HTML tag is used to create a hyperlink?', correctAnswer: 'a',
                    a: '<a>', b: '<p>', c: '<h1>'
                }
            ];
        }
        else if (examType == "css") { // THis one if the user chose css

            return [
                {
                    id: 1, question: 'Which CSS property is used to change the font size?', correctAnswer: 'b',
                    a: 'text-align', b: 'font-size', c: 'color'
                },
                {
                    id: 2, question: 'Which CSS property is used to change the background color of an element?', correctAnswer: 'b',
                    a: 'background-color', b: 'color', c: 'border'
                },
                {
                    id: 3, question: 'Which CSS property is used to set the margin around an element?', correctAnswer: 'c',
                    a: 'border', b: 'padding', c: 'margin'
                },
                {
                    id: 4, question: 'Which CSS property is used to make text bold?', correctAnswer: 'b',
                    a: 'text-decoration', b: 'font-weight', c: 'font-style'
                },
                {
                    id: 5, question: 'Which CSS property is used to center an element horizontally?', correctAnswer: 'a',
                    a: 'margin: auto;', b: 'text-align: center;', c: 'display: flex;'
                }
            ];

        }

        else if (examType == "javascript") { // This one if the user chose js and we used else if not else because the conditional is obligatory to pass through js

            return [
                {
                    id: 1, question: 'Which keyword is used to declare a variable in JavaScript?', correctAnswer: 'c',
                    a: 'const', b: 'let', c: 'var'
                },
                {
                    id: 2, question: 'Which operator is used to compare two values in JavaScript?', correctAnswer: 'b',
                    a: '!=', b: '==', c: '==='
                },
                {
                    id: 3, question: 'Which method is used to add an element to the end of an array in JavaScript?', correctAnswer: 'b',
                    a: 'shift()', b: 'push()', c: 'pop()'
                },
                {
                    id: 4, question: 'Which method is used to remove the first element from an array in JavaScript?', correctAnswer: 'a',
                    a: 'shift()', b: 'pop()', c: 'unshift()'
                },
                {
                    id: 5, question: 'Which method is used to convert a string to an integer in JavaScript?', correctAnswer: 'c',
                    a: 'toUpperCase()', b: 'toString()', c: 'parseInt() '
                }
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
let questionNumber = document.getElementById("countNum");



const lines = document.querySelectorAll(".line");
lines[counterNumber].classList.add("active");

const nextQuestion = document.getElementById("next");

let arrQuestions = Questions.getQuestions(user.examType);

Questions.setAnswersInLocalStorage(arrQuestions);


function loadQuiz() {
    const questions = arrQuestions[counterQuestion];

    let question = document.getElementById("question");
    let choiceA = document.getElementById("answerA");
    let choiceB = document.getElementById("answerB");
    let choiceC = document.getElementById("answerC");

    question.textContent = questions.question;
    choiceA.textContent = questions.a;
    choiceB.textContent = questions.b;
    choiceC.textContent = questions.c;
    questionNumber.textContent = counterQuestion + 1;
}

function getSelected() {
    const answersElement = document.querySelectorAll("input");

    let answer = undefined;

    answersElement.forEach((answerElement) => {

        if (answerElement.checked) {
            answer = answerElement;
        }
    });

    return answer;
}


loadQuiz();

let arrAnswers = [];

nextQuestion.addEventListener("click", event => {

    event.preventDefault();

    const answer = getSelected();

    let answerValue = answer.value;
    console.log(answerValue);

    if (answer) {

        if (answer.id === arrQuestions[counterQuestion].correctAnswer) {

            if (answerValue === 'a') {
                arrAnswers.push(
                    {
                        id: arrQuestions[counterQuestion].id,
                        question: arrQuestions[counterQuestion].question,
                        UserAnswer: arrQuestions[counterQuestion].a, status: true
                    });
            }
            else if (answerValue === 'b') {
                arrAnswers.push(
                    {
                        id: arrQuestions[counterQuestion].id,
                        question: arrQuestions[counterQuestion].question,
                        UserAnswer: arrQuestions[counterQuestion].b, status: true
                    });
            }
            else if (answerValue === 'c') {
                arrAnswers.push(
                    {
                        id: arrQuestions[counterQuestion].id,
                        question: arrQuestions[counterQuestion].question,
                        UserAnswer: arrQuestions[counterQuestion].c, status: true
                    });
            }
        }
        else {

            if (answerValue === 'a') {
                arrAnswers.push(
                    {
                        id: arrQuestions[counterQuestion].id,
                        question: arrQuestions[counterQuestion].question,
                        UserAnswer: arrQuestions[counterQuestion].a, status: false
                    });
            }
            else if (answerValue === 'b') {
                arrAnswers.push(
                    {
                        id: arrQuestions[counterQuestion].id,
                        question: arrQuestions[counterQuestion].question,
                        UserAnswer: arrQuestions[counterQuestion].b, status: false
                    });
            }
            else if (answerValue === 'c') {
                arrAnswers.push(
                    {
                        id: arrQuestions[counterQuestion].id,
                        question: arrQuestions[counterQuestion].question,
                        UserAnswer: arrQuestions[counterQuestion].c, status: false
                    });

            }
        }

        if (questionNumber.innerHTML == "4") {
            nextQuestion.textContent = "Submit";
        }
        counterQuestion++;

        if (counterQuestion < arrQuestions.length) {
            loadQuiz();
        }
        else {

            stopTimer();
        }
    }

    counterNumber++;

    lines[counterNumber].classList.add("active");
});

function stopTimer() {

    let user_results = { result: '', correctAnswer: 0, incorrectAnswer: 0 };

    arrAnswers.forEach(element => {
        if (element.status)
            user_results.correctAnswer++
        else
            user_results.incorrectAnswer++
    });

    if (user_results.correctAnswer >= 3)
        user_results.result = "pass";
    else
        user_results.result = "fail";

    sessionStorage.setItem('UserInformation', JSON.stringify(arrAnswers));
    sessionStorage.setItem('UserInformationsResult', JSON.stringify(user_results));

    clearInterval(clock);
    window.location.href = '../Pages/ResultPage.html';
}

const New = {
    
    status: 'success',
    title: '',
    content: '',
    alert: function ({ status, title, content, confirmbtn = true }) {
        var title;
        var status;
        var content;
        var modal = document.createElement('section');
        modal.setAttribute('class', 'alert_modal');
        document.body.append(modal);
        var alert = document.createElement('div');
        alert.setAttribute('class', 'alert_container');
        modal.appendChild(alert);
        alert.innerHTML = `
    <div class="alert_heading"></div>
    <div class="alert_details">
    <h2>
        ${title}
    </h2>
    <p>
        ${content}
    </p>
    </div>
    <a class="alert_footer">
    </a> ` ;


        var alert_heading = document.querySelector('.alert_heading');
        var alert_footer = document.querySelector('.alert_footer');

        if (status == '' || status == 'success') {
            alert_footer.innerHTML = `<span class="close" title="Ok">Continue</span>`;
            document.querySelector('.alert_details > h2').style.color = '#1FB397';
        } else if (status == 'danger' || status == 'error') {
            alert_heading.innerHTML = ``;
            alert_footer.innerHTML = `<span class="close" title="Ok">Continue</span>`;
            document.querySelector('.alert_details > h2').style.color = '#797979';
        } else if (status == 'info' || status == 'confirm') {
            alert_heading.innerHTML = `<svg width="150" height="150" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="20" stroke-dashoffset="20" d="M8.99999 10C8.99999 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 10.9814 14.5288 11.8527 13.8003 12.4C13.0718 12.9473 12.5 13 12 14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.4s" values="20;0"/></path></g><circle cx="12" cy="17" r="1" fill="white" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.2s" values="0;1"/></circle></svg>`;
            confirmbtn == true ?
                alert_footer.innerHTML = `<span class="accept" title="I approve">I approve</span> <span class="close" title="I refuse">I refuse</span>` :
                alert_footer.innerHTML = `<span class="close" title="Ok">Continue</span>`;
            document.querySelector('.alert_details > h2').style.color = '#484B95';
        }

        document.querySelector('.alert_footer .close').addEventListener('click', function () {
            alert.remove();
            modal.remove();
            startTimer(quizDuration, display);
        })
    }
}

New.alert({
    status: 'info',
    title: 'Quiz Instructions',
    content: '     10 point awarded for a correct answer and no marks for a incorrect answer You have to choose an answer before clicking next button. Click submit when you finish the Quiz. You can not go back to the pervious Question.',
    confirmbtn: false
})
