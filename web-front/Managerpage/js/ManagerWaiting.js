//get id value in HTML
let inputCode = document.getElementById('waiting-code');
let inputMember = document.getElementById('waiting-number');
let waitingMember = 0;

//socket.io
let socket = io('http://52.79.121.254/waitingAdmin');
 
socket.emit('connection', 1);
socket.on('code', (auth) => {
    console.log("code: ", auth.code);
    inputCode.innerText = "code : " + auth.code;
});
socket.on('waitingList', (member) => {
    waitingMember += 1;
    console.log("count: ", waitingMember);
    inputMember.innerText = waitingMember + "명";
});
socket.on('plusWaiting', (plus) => {
    waitingMember += 1;
    console.log("count: ", waitingMember);
    inputMember.innerText = waitingMember + "명";
});
socket.on('minusWaiting', (minus) => {
    waitingMember -= 1;
    console.log("count: ", waitingMember);
    inputMember.innerText = waitingMember + "명";
});

//nextpage function
function nextpage() {
    socket.emit('start', 1);
    location.href = "./ManagerProceeding.html";
};