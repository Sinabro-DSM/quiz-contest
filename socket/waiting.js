const init = async (waitingSocket, waitingAdminIO, redisClient) => {
    const nickname = waitingSocket.handshake.query.nickname;
    const socketId = waitingSocket.id.split('#');

    const value = {
        nickname,
        socketId: socketId[1],
        score: 0
    }
 
    try {
        await redisClient.select(0);
        await redisClient.set(nickname, JSON.stringify(value));
        const reply = await redisClient.get(nickname);
        console.log(reply);
        waitingAdminIO.emit('plusWaitingCount');
    } catch(e) {
        console.log(e);
    }
};

const destroy = (waitingAdminIO) => {
    waitingAdminIO.emit('minusWaitingCount');
};

module.exports = {
    init,
    destroy,
}