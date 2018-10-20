//get id value in HTML
let quizNumberElement = document.getElementById('QuestionNumber');
let quizBoxElement = document.getElementById('Question');
let answer1 = document.getElementById('answer1');
let answer2 = document.getElementById('answer2');
let answer3 = document.getElementById('answer3');
let answer4 = document.getElementById('answer4');
let explanationElement = document.getElementById('explanation')
let socreElement = document.getElementById('score');
let timerElement = document.getElementById('timer');
let wrong = document.querySelector('#wrongAnswer').style;
let right = document.querySelector('#rightAnswer').style;  
let explanation = document.querySelector('#explanation').style;
let defaultButton;
let peopleAnswer = document.getElementById('defult-button');

//Declare Variables
let target;
let quizNumber = 1;
let setTime = 9;
let score = 0; 
let quizAnswer;
let check = {
    cord: true,
    nickname: true,
    phonenumber: true
};
let userAnswer = null;

//socket io code
let socket = io('http://52.79.121.254/participant');

socket.emit('connection', 1);
socket.on('QSolution', (response) => {
    console.log(response);
    quizNumberElement.innerText = 'Q' + response.answer;
    quizBoxElement.innerText = response.question;
    answer1.value = `① ${response["1"]}`;
    answer2.value = `② ${response["2"]}`;
    answer3.value = `③ ${response["3"]}`;
    answer4.value = `④ ${response["4"]}`;
    explanationElement.innerText = response.solution;
    quizAnswer = response.answer; 
    console.log("answer: ",quizAnswer);
    quizNumber += 1;
});
socket.on('plusScore', (getScore) => {
    score += getScore.plusScore;
    socreElement.innerText = '★SCORE : ' + score;
});
socket.on()


//onclick code
function answerCheck(participantAnswer, num) {
    target = document.querySelector(participantAnswer);
    target.disabled = false;
    targetStyle = target.style;
    userAnswer = num+"";
    console.log("anser: ",userAnswer);
};

function Timer_msg() {
    let msg = setTime + "초";
    timerElement.innerHTML = msg;

    setTime--;

    if(setTime < 0) {
        timerElement.innerHTML = "0초";
        if (userAnswer === null) {
            wrong.display = 'block';
            explanation.display = 'block';
            socket.on('connection', function(socket) {
                socket.emit('incorrectReply', score);
            });
        } else if (userAnswer === quizAnswer) {
            targetStyle.backgroundColor = "FF000050";
            right.display = "block";
            explanation.display = "block";
            socket.on('connection', function(socket) {
                socket.emit('correctReply', score);
            });
        } else {
            targetStyle.backgroundColor = '#FF000050';
            wrong.display = 'block';
            explanation.display = 'block';
            socket.on('connection', function(socket) {
                socket.emit('incorrectReply', (socre));
            });
        }
    }
};

window.onload = function TimerStart(){ tid=setInterval('Timer_msg()',1000) };