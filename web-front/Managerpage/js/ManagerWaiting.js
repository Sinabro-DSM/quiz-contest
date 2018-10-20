//get id value in HTML
let inputCode = document.getElementById('waiting-code');
let inputMember = document.getElementById('waiting-number');
let waitingMember = [];

//socket.io
let socket = io('http://52.79.121.254/waitingAdmin');
 
socket.emit('connection', 1);
socket.on('code', (auth) => {
    console.log("code: ", auth.code);
    inputCode.innerText = "code : " + auth.code;
});
socket.on('waitingList', ({nickname}) => {
    if(nickname.length>=0){
        let memberNum = nickname.length;
        console.log("first count: ", memberNum);
        inputMember.innerText = memberNum||0+ "명";
        waitingMember = nickname;
    }
    console.log(waitingMember)
});
socket.on('plusWaiting', ({nickname}) => {
    console.log("plus count: ", nickname.length);
    console.log(waitingMember);
    for(additional of nickname) {
        waitingMember.push(additional)
    }
    inputMember.innerText = waitingMember.length + "명";
});
socket.on('minusWaiting', ({nickname}) => {
    for(minus of nickname) {
        waitingMember.pop(waitingMember.indexOf(minus))
    }
    inputMember.innerText = waitingMember.length + "명";
});

//nextpage function
function nextpage() {
    socket.emit('start', 1);
    location.href = "./ManagerProceeding.html";
};