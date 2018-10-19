//get id value in HTML
let rankerElement = document.createElement('li');
let rankerListElement = document.getElementById('ranker-list');
let questionElement = document.createElement('li');
let questionListElement = document.getElementById('question-list');
let i = 0;

//socket.io
let socket = io('http://52.79.121.254/gameAdmin');

socket.emit('connection', 1);
socket.on('QSolution', (question) => {
    let element = document.createElement('li');
    element.innerHTML = `<span class="question-text">${question.question} 정답: ${question.answer}</span>`;
    questionElement.appendChild(element);
    questionListElement.appendChild(element);
});
socket.on('score', (ranker) => {
    rankerListElement.innerHTML = "";
    ranker.nickname.filter(function(curVal) {
        let element = document.createElement('li');
        element.innerHTML = `<span class="ranker-name">${curVal}</span>`;
        rankerElement.appendChild(element);
        rankerListElement.appendChild(element);
    });
});
socket.on('score', (presentScore) => {
    let alternativeScore = [];

    for(i of presentScore.grade) {
        let index = presentScore.grade.indexof(i);
        alternativeScore.push({
            grade: i,
            nickname: presentScore.nickname[index]
        });
    }
});