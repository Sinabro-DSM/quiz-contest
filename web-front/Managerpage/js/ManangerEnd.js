//get id value in HTML
let finalRankerElement = document.createElement('li');
let finalRankerListElement = document.getElementById('final-ranker-list');
let inputMember = document.getElementById('watitng-box-member');
let waitingMember = 0;

//socket.io
let socket = io('http://52.79.121.254/waitingAdmin');
let socket1 = io('http://52.79.121.254/gameAdmin');

socket.emit('connection', 1);
socket1.emit('connection', 1);

socket.on('waitingList', (member) => {
    console.log("count: ", waitingMember);
    inputMember.innerText = waitingMember + "명";
    waitingMember += 1;
});

socket1.on('finishGame', (ranker) => {    
    console.log(ranker);
    ranker.nickname.filter(function(curvla) {
        let element = document.createElement('li');
        element.innerHTML = `<span class="ranker-who">${curvla}</span>`
        finalRankerElement.appendChild(element);
        finalRankerListElement.appendChild(element);
    });
});

function backpage() {
    location.href = "./ManagerWaiting.html";
};