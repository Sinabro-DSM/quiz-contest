let finalRankerElement = document.createElement('li');
let finalRankerListElement = document.getElementById('final-ranker-list');

let socket = io();

socket.on('connection', function(socket) {
    socket.on('sendMember', (member) => {
        inputMember.value(member.toString() + '명');
    });
    socket.on('rankersend', (ranker) => {    
        let finalRankerData = ["dasa", "Adas", "saffd", "asdasd", "fdfsf", "adssad"];
        finalRankerData.filter(function(curvla) {
            let element = document.createElement('li');
            element.innerHTML = `<span class="ranker-who">${curvla}</span>`
            finalRankerElement.appendChild(element);
            finalRankerListElement.appendChild(element);
        });
    });
});