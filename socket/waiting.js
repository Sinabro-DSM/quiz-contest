const init = async (waitingSocket, adminIO, redisClient) => {
    const nickname = waitingSocket.handshake.query.nickname;
    const socketId = waitingSocket.id.split('#');

    const value = {
        nickname,
        socketId: socketId[1],
        score: 0
    }

    try {
        await redisClient.set(nickname, JSON.stringify(value));
        const reply = await redisClient.get(nickname);
        console.log(reply);
        adminIO.emit('plusWaitingCount');
    } catch(e) {
        console.log(e);
    }
};

const destroy = (adminIO) => {
    adminIO.emit('minusWaitingCount');
};

module.exports = {
    init,
    destroy,
}