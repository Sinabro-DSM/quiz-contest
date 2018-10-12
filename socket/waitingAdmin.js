const init = async (waitingAdminSocket, waitingIO, redisClient) => {
    try {
        await redisClient.flushall();
    } catch(e) {
        console.error(e);
    }
    
    try {
        await redisClient.select(1);
        let code =Math.random()*(10000-1000)+1000;
        await redisClient.set('code',code);
        console.log(code);
        waitingAdminSocket.emit('waitingCount', {count: countWaiting(waitingIO)});
    } catch(e) {
        console.error(e);
    }
};

const destroy = () => {};

const gameStart = ()=>{
    waitingIO.emit('Start');
};

const countWaiting = (waitingIO) => Object.keys(waitingIO.connected).length;

module.exports = {
    init,
    destroy,
    gameStart,
}