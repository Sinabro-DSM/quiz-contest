let waitingListElement = document.getElementById('waiting-list')
let waitingElement = document.createElement('div');
let listNumber = 0;

let socket = io('http://52.79.121.254');

socket.emit('connection', 1);
socket.on('waitingList', (participantList) => {
    let element = document.createElement('li');
    element.innerHTML = `<div class="user-nickname"> user${memberCount} ${participantList.list[listNumber]} </div>`;
    waitingElement.appendChild(element);
    waitingListElement.appendChild(element);
    listNumber += 1;
});