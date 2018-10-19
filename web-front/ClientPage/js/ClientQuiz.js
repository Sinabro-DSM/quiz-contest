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
let defaultButton = document.getElementById('defult-button');
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

//socket io code
let socket = io('http://52.79.121.254/gameAdmin');

socket.emit('connection', 1);
socket.on('QSolution', (quiz) => {
    quizNumberElement.innerText = "";
    quizNumberElement.innerText = 'Q' + quizNumber;
    quizBoxElement.innerText = quiz.question;
    answer1.innerText = quiz[1];
    answer2.innerText = quiz[2];
    answer3.innerText = quiz[3];
    answer4.innerText = quiz[4];
    explanationElement.innerText = quiz.solution;
    quizAnswer = quiz.answer; 
    quizNumber += 1;
});
socket.on('plusScore', (getScore) => {
    score += getScore.plusScore;
    socreElement.innerText = '★SCORE : ' + score;
});


//onclick code
function answerCheck(participantAnswer) {
    target = document.querySelector(participantAnswer).style;
    peopleAnswer = participantAnswer;
};

function Timer_msg() {
    let msg = setTime + "초";
    timerElement.innerHTML = msg;

    setTime--;

    if(setTime < 0) {
        timerElement.innerHTML = "0초";
        if (peopleAnswer === defaultButton) {
            wrong.display = 'block';
            explanation.display = 'block';
            socket.on('connection', function(socket) {
                socket.emit('incorrectReply', (socre));
            });
        } else if (peopleAnswer === quizAnswer) {
            target.backgroundColor = "FF000050";
            right.display = "block";
            explanation.display = "block";
            socket.on('connection', function(socket) {
                socket.emit('correctReply', (socre))
            });
        } else {
            target.backgroundColor = '#FF000050';
            wrong.display = 'block';
            explanation.display = 'block';
            socket.on('connection', function(socket) {
                socket.emit('incorrectReply', (socre));
            });
        }
    }
};

window.onload = function TimerStart(){ tid=setInterval('Timer_msg()',1000) };