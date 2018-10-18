//get id value in HTML
let inputCode = document.getElementById('waiting-code');
let inputMember = document.getElementById('waiting-number');

//socket.io
let socket = io('http://52.79.121.254/waitingAdmin');


socket.on('code', (auth) => {
    inputCode.value(auth.code);
});
socket.on('waitingCount', (member) => {
    inputMember.value(member.count);
});

//nextpage function
function nextPage() {
    socket.emit('start', (startContest));
};