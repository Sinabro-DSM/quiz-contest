let finalList = document.getElementById('final-ranking-list');
let finalListElement = document.createElement('li');
let i = 0;

let socket = io('http://52.79.121.254/gameAdmin');

socket.on('finishGame', (ranker) => {
    for (i=0; i<=ranker.length; i++) {
        let element = document.createElement('li');
        element.innerHTML = `<li><span>${ranker.nickname[i]}</span></li>`;
        waitingElement.appendChild(element);
        waitingListElement.appendChild(element);   
    }
});