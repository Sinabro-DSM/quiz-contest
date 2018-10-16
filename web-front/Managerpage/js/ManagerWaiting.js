//get id value in HTML
let inputCode = document.getElementById('waiting-code');
let inputMember = document.getElementById('waiting-number');

//socket.io
let socket = io('/waitingAdmin');

socket.on('connection', function(socket) {
    socket.on('code', (auth) => {
        inputCode.value(auth.code);
    });
    socket.on('waitingCount', (member) => {
        inputMember.value(member.count);
    });
});

//nextpage function
function nextPage() {
    location.href = '';
};