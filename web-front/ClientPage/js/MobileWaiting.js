let clientCode = document.getElementById(code-box);

function waitingRoom() {
    socket.on('connection', function(socket) {
        socket.on('code', (code) => {
            if(clientCode == code) {
                
            }
        })
    })
}