//get id value in HTML
let rankerElement = document.createElement('li');
let rankerListElement = document.getElementById('ranker-list');
let questionElement = document.createElement('li');
let questionListElement = document.getElementById('question-list');

//socket.io
let socket = io('http://52.79.121.254/gameAdmin');

socket.emit('connection', 1);
socket.on('QSolution', (question) => {
    console.log(1);
    console.log(question);
    let element = document.createElement('li');
    element.innerHTML = `<span class="question-text">${question.question} 정답: ${question.answer}</span>`;
    questionElement.appendChild(element);
    questionListElement.appendChild(element);
});
socket.on('score', (ranker) => {
    console.log("ranker: ", ranker);
    rankerListElement.innerText = "";
    ranker.nickname.filter(function(curVal) {
        let element = document.createElement('li');
        element.innerHTML = `<span class="ranker-name">${curVal}</span>`;
        rankerElement.appendChild(element);
        rankerListElement.appendChild(element);
    });
});

function finalpage() {
    location.href = "./ManagerEnd.html";
};