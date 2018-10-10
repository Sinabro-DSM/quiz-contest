const init = async (adminSocket, waitingIO, redisClient) => {
    try {
        await redisClient.flushdb();
        adminSocket.emit('waitingCount', {count: countWaiting(waitingIO)});
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