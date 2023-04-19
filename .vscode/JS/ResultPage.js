
// Get The User Object from the session Storage.
let userInformations = sessionStorage.getItem("UserInformation");
// userInfo = [{id: , question:, userAnswer: a,b,c, status: correct or wrong}]
let userInfo = JSON.parse(userInformations);

// Get the User Object from the session Storage array of [result, #ofcorrectAnswer:, #ofIncorrectAnswer ]
let userInformationsResults = sessionStorage.getItem("UserInformationsResult");
let userInfoResult = JSON.parse(userInformationsResults);


let result = userInfoResult.result;


changeResult(userInfoResult.result, userInfoResult.correctAnswer, userInfoResult.incorrectAnswer);

// get the id of the table and append the result info.
let resultButton = document.getElementById("resultButton");


let headTable = document.getElementById("headTable");
let bodyTable = document.getElementById("bodyTable");

resultButton.addEventListener("click", function () {

let tableHeadRow = document.createElement("tr");

let tableHeadColumn1 = document.createElement("th");
tableHeadColumn1.textContent = "ID";
tableHeadRow.appendChild(tableHeadColumn1);


let tableHeadColumn2 = document.createElement("th");
tableHeadColumn2.textContent = "Question ";
tableHeadRow.appendChild(tableHeadColumn2);


let tableHeadColumn3 = document.createElement("th");
tableHeadColumn3.textContent = "Your Answer";
tableHeadRow.appendChild(tableHeadColumn3);




// append header column
headTable.appendChild(tableHeadRow);


for (let i = 0; i < userInfo.length; i++) {
    let tableBodyRow = document.createElement("tr");

    let tableBodyColumn1 = document.createElement("td");
    tableBodyColumn1.textContent = `#${userInfo[i].id}`;

    tableBodyRow.appendChild(tableBodyColumn1);

    let tableBodyColumn2 = document.createElement("td");
    tableBodyColumn2.textContent = `${userInfo[i].question}`;
    tableBodyRow.appendChild(tableBodyColumn2);

    let tableBodyColumn3 = document.createElement("td");
    tableBodyColumn3.textContent = `${userInfo[i].UserAnswer}`;
    if (userInfo[i].status == false){
        tableBodyColumn3.style.color = "red";
    }
    else {
        tableBodyColumn3.style.color = "rgba(6, 190, 24)";
    }

    tableBodyColumn3.style.marginTop = "40px";

    tableBodyRow.appendChild(tableBodyColumn3);

    

// append the table body
    bodyTable.appendChild(tableBodyRow);
    let tableBg = document.getElementById("divTable");
    tableBg.style.backgroundColor = "antiquewhite";
    tableBg.style.textAlign = "-webkit-center";
}
// disable button
resultButton.disabled = true;

});

// Fun. to change the result based on the user info result.
function changeResult(result, correctAnswer, incorrectAnswer){

    


    let hero = document.getElementById("hero");
    // check if the user pass or fail and change the theme.
    if(result === "pass"){
        document.getElementById("correctAns").textContent = correctAnswer + "/5";
        document.getElementById("incorrectAns").textContent = incorrectAnswer + "/5";

    }
    else if(result === "fail"){
        let result_hero = document.getElementById("res");
        let result_img = document.getElementById("res_img");
       
        let img = "../images/fail.png";

        let herotext = "Unfortunately! You have Failed the Quiz";
        let resultAns = "FAILED !";
        result_img.src = img;
        result_hero.textContent = herotext;
   
        hero.style.backgroundColor = "#9c0405";
        document.getElementById("resultButton").style.backgroundColor = "#9c0405";
        document.getElementById("img-result1").src = "../images/fail_icon_q.png";
        document.getElementById("img-result2").src = "../images/fail_icon_timer.png";
        document.getElementById("img-result3").src = "../images/fail_icon_star.png";
        document.getElementById("img-result4").src = "../images/fail_icon_star_outline.png";
        document.getElementById("correctAns").textContent = correctAnswer + "/5";
        document.getElementById("incorrectAns").textContent = incorrectAnswer + "/5";


    }

    else{
        alert("Invaild Result!");
    }
}

