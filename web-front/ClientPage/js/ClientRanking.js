let finalList = document.getElementById('final-ranking-list');
let finalListElement = document.createElement('li');
let i = 1;

let socket = io('http://52.79.121.254/gameAdmin');

socket.emit('connection', 1);
socket.on('finishGame', (ranker) => {
    ranker.nickname.filter(function(curVal) {
        let element = document.createElement('li');
        element.innerHTML = `<li><span>${curVal}</span></li>`;
        waitingElement.appendChild(element);
        waitingListElement.appendChild(element);    
    });
});