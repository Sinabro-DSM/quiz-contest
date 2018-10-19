let waitingListElement = document.getElementById('waiting-list')
let waitingElement = document.createElement('div');    
let listNumber = 0;

let socket = io('http://52.79.121.254/waitingAdmin');

socket.emit('connection', 1);
socket.on('waitingList', (participantList) => {
    let element = document.createElement('div');
    element.innerHTML = `<div class="user-nickname"> user${listNumber} ${participantList.list} </div>`;
    waitingElement.appendChild(element);
    waitingListElement.appendChild(element);
    listNumber += 1;
});