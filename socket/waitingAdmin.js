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

    try {
        const arr = shuffle(50);
        await redisClient.select(2);
        arr.forEach(i => redisClient.rpush('question', i.toString()));
    } catch(e) {
        console.log(e);
    }
};

const destroy = () => {};

const gameStart = ()=>{
    waitingIO.emit('Start');
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

const countWaiting = (waitingIO) => Object.keys(waitingIO.connected).length;

module.exports = {
    init,
    destroy,
    gameStart,
}