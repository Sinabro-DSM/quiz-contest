//get id value in HTML
let inputCode = document.getElementById('waiting-code');
let inputMember = document.getElementById('waiting-number');

//socket.io
let socket = io('http://52.79.121.254:3000/waitingAdmin');

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
    socket.on('connection', function(socket) {
        socket.on('start', (startContest) => {
            if (startContest == 1) 
                location.href="#";
        });
    });
};