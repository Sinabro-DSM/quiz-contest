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

    try {
        const arr = shuffle(50);
        await redisClient.select(2);
        arr.forEach(i => redisClient.rpush('question', i.toString()));
    } catch(e) {
        console.log(e);
    }
};

const destroy = (waitingAdminIO) => {
    waitingAdminIO.emit('minusWaitingCount');
};

const shuffle = (num) => {
    const arr = [];

    for(let i=1; i<=num; i++)
        arr.push(i);

    for (let i=arr.length; i; i--) {
        let rand = Math.floor(Math.random() * i);
        let temp = arr[i-1];
        arr[i-1] = arr[rand];
        arr[rand] = temp;
    }
    return arr;
}

module.exports = {
    init,
    destroy,
}