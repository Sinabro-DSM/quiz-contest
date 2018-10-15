//get id value in HTML
let rankerElement = document.createElement('li');
let rankerListElement = document.getElementById('ranker-list');
let questionElement = document.createElement('li');
let questionListElement = document.getElementById('question-list');

//socket.io
let socket = io();

socket.on('connection', function(socket) {
    socket.on('questionConnection', (question) => {
        let questionData = ["dasdasdas", "sdhjahjfydyjahs", "djsauifhdsiufhuihfdad", "hdssudyhdsuadssad", "dasdhuasdsda"];
        questionData.filter(function(curval) {
            let element = document.createElement('li');
            element.innerHTML = `<span class="question-text">${curval}</span>`;
            questionElement.appendChild(element);
            questionListElement.appendChild(element);
        });
    });
    socket.on('rankerConnection', (ranker) => {
        let rankersData = ["hrll", "abcd", "qwer", "eee", "ldsa"];
        rankersData.filter(function(curVal) {
            let element = document.createElement('li');
            element.innerHTML = `<span class="ranker-name">${curVal}</span>`;
            rankerElement.appendChild(element);
            rankerListElement.appendChild(element);
        });
    });
});

