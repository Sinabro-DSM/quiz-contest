const init = async (waitingAdminSocket, waitingIO, redisClient) => {
    try {
        await redisClient.flushdb();
        await redisClient.select(1);
        let code =Math.random()*(10000-1000)+1000;
        await redisClient.set('code',code);
        console.log(code);
        waitingAdminSocket.emit('waitingCount', {count: countWaiting(waitingIO)});
    } catch(e) {
        console.log(e);
    }
};

const destroy = () => {};

const countWaiting = (waitingIO) => Object.keys(waitingIO.connected).length;

module.exports = {
    init,
    destroy,
}