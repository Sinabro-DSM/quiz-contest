//get id value in HTML
let finalRankerElement = document.createElement('li');
let finalRankerListElement = document.getElementById('final-ranker-list');

//socket.io
let socket = io('/gameAdmin');

socket.on('connection', function(socket) {
    socket.on('waitingCount', (member) => {
        inputMember.value(member.code.toString() + '명');
    });
    socket.on('finishGame', (ranker) => {    
        ranke.nickname.filter(function(curvla) {
            let element = document.createElement('li');
            element.innerHTML = `<span class="ranker-who">${curvla}</span>`
            finalRankerElement.appendChild(element);
            finalRankerListElement.appendChild(element);
        });
    });
});