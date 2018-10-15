//get id value in HTML
let rankerElement = document.createElement('li');
let rankerListElement = document.getElementById('ranker-list');
let questionElement = document.createElement('li');
let questionListElement = document.getElementById('question-list');

//socket.io
let socket = io(/waitingAdmin/gameAdmin);

socket.on('connection', function(socket) {
    socket.on('QSolution', (question) => {
        let questionData = {
            "question":"",
            "answer":""
        };
        questionData.filter(function(curval) {
            let element = document.createElement('li');
            element.innerHTML = `<span class="question-text">${curval}</span>`;
            questionElement.appendChild(element);
            questionListElement.appendChild(element);
        });
    });
    socket.on('finishGame', (ranker) => {
        let rankersData = {
            "grade":"",
            "nickname":""
        };
        rankersData.filter(function(curVal) {
            let element = document.createElement('li');
            element.innerHTML = `<span class="ranker-name">${curVal}</span>`;
            rankerElement.appendChild(element);
            rankerListElement.appendChild(element);
        });
    });
});

