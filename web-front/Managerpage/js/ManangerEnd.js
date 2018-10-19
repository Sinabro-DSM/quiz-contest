//get id value in HTML
let finalRankerElement = document.createElement('li');
let finalRankerListElement = document.getElementById('final-ranker-list');
let inputMember = document.getElementById('watitng-box-members');

//socket.io
let socket = io('http://52.79.121.254/gameAdmin');

socket.emit('connection', 1);
socket.on('waitingCount', (member) => {
    inputMember.innerHTML = member.count;
});

socket.on('finishGame', (ranker) => {    
    ranker.nickname.filter(function(curvla) {
        let element = document.createElement('li');
        element.innerHTML = `<span class="ranker-who">${curvla}</span>`
        finalRankerElement.appendChild(element);
        finalRankerListElement.appendChild(element);
    });
});