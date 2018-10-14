let rankerElement = document.createElement('li');
let rankerListElement = document.getElementById('ranker-list');
let rankersData = ["hrll", "abcd", "qwer", "eee", "ldsa"];

rankersData.filter(function(curVal) {
    let element = document.createElement('li');
    element.innerHTML = `<span class="ranker-name">${curVal}</span>`;
    rankerElement.appendChild(element);
    rankerListElement.appendChild(element);
});

let questionElement = document.createElement('li');
let questionListElement = document.getElementById('question-list');
let questionData = ["dasdasdas", "sdhjahjfydyjahs", "djsauifhdsiufhuihfdad", "hdssudyhdsuadssad", "dasdhuasdsda"];

questionData.filter(function(curval) {
    let element = document.createElement('li');
    element.innerHTML = `<span class="question-text">${curval}</span>`;
    questionElement.appendChild(element);
    questionListElement.appendChild(element);
});