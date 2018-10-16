//get id value in HTML
let rankerElement = document.createElement('li');
let rankerListElement = document.getElementById('ranker-list');
let questionElement = document.createElement('li');
let questionListElement = document.getElementById('question-list');

//socket.io
let socket = io('/gameAdmin');

socket.on('connection', function(socket) {
    socket.on('QSolution', (question) => {
        let element = document.createElement('li');
        element.innerHTML = `<span class="question-text">${question.question} 정답: ${question.answer}</span>`;
        questionElement.appendChild(element);
        questionListElement.appendChild(element);
    });
    socket.on('', (ranker) => {
        innerHTML="";
        ranker.nickname.filter(function(curVal) {
            let element = document.createElement('li');
            element.innerHTML = `<span class="ranker-name">${curVal}</span>`;
            rankerElement.appendChild(element);
            rankerListElement.appendChild(element);
        });
    });
});

