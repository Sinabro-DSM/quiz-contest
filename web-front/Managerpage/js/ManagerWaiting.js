//get id value in HTML
let inputCode = document.getElementById('waiting-code');
let inputMember = document.getElementById('waiting-number');

//socket.io
let socket = io();

socket.on('connection', function(socket) {
    socket.on('sendCode', (code) => {
        inputCode.value(code);
    });
    socket.on('sendMember', (member) => {
        inputMember.value(member.toString() + '명');
    });
});

//nextpage function
function nextPage() {
    location.href = '';
};