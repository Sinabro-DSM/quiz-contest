let waitingListElement = document.getElementById('waiting-list')
let waitingElement = document.createElement('div');    
let listNumber = 0;

let socket = io('http://52.79.121.254/waiting');

socket.emit('connection', 1);
socket.on('waitingList', (response) => {
    console.log(response);
    let participantList = response.nickname;
    for(participant of participantList) {
        console.log(participantList);
        let element = document.createElement('div');
        element.innerHTML = `<div class="user-nickname"> ${participantList[listNumber]} </div>`;
        waitingElement.appendChild(element);
        waitingListElement.appendChild(waitingElement);
        listNumber += 1;
    }
});