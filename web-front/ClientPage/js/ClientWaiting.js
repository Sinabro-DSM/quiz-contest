let waitingListElement = document.getElementById('waiting-list')
let waitingElement = document.createElement('div');    
let listNumber = 0;
let waitingList = [];

let socket = io('http://52.79.121.254/waiting');

socket.emit('connection', 1);
socket.on('waitingList', (response) => {   
    let participantList = response.nickname;
    waitingList = participantList;
    waitingElement.innerHTML = ""
    for(participant of participantList) {
        console.log(participant)
        let element = document.createElement('div');
        element.innerHTML = `<div class="user-nickname">${participant} </div>`;
        waitingElement.appendChild(element);
        waitingListElement.appendChild(waitingElement);
    }
});
socket.on('plusWaiting', (response) => {
    for(additional of response.nickname) {
        if(waitingList.indexOf(additional)<0){
            waitingList.push(additional);
        }
    }
    waitingElement.innerHTML = ""
    for(participant of waitingList) {
        console.log(participant)
        let element = document.createElement('div');
        element.innerHTML = `<div class="user-nickname">${participant} </div>`;
        waitingElement.appendChild(element);
        waitingListElement.appendChild(waitingElement);
    }
})
socket.on('minusWating', (response) => {
    waitingList.pop(waitingList.indexOf(response.nickname))

    for(participant of waitingList) {
        let element = document.createElement('div');
        element.innerHTML = `<div class="user-nickname">${participant} </div>`;
        waitingElement.appendChild(element);
        waitingListElement.appendChild(waitingElement);
    }
})
socket.on('start', (response) => {
    window.location.href = "./DesktopClientQuiz.html";
})