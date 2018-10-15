require('dotenv').config();

const init = async (waitingAdminSocket, waitingIO, redisClient) => {
    try {
        await redisClient.flushall();
    } catch(e) {
        console.error(e);
    }
    
    try {
        let code =Math.floor(Math.random()*(10000-1000))+1000;

        await redisClient.select(1);
        await redisClient.set('code',code);

        console.log(code);

        waitingAdminSocket.emit('code',{code: code});
        waitingAdminSocket.emit('waitingCount', {count: countWaiting(waitingIO)});
    } catch(e) {
        console.error(e);
    }

    try {
        const num = process.env.QUESTION_NUM
        const arr = shuffle(num);
        await redisClient.select(1);
        arr.forEach(i => redisClient.rpush('question', i.toString()));
    } catch(e) {
        console.error(e);
    }

    try {
        const obj = initialSetting();
        await redisClient.select(1);
        await redisClient.hmset('answerSeq', obj);
    } catch(e) {
        console.error(e);
    }
};

const destroy = () => {};

const gameStart = (waitingIO)=>{
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

const initialSetting = () => {
    const obj = {};
    for(let i=1; i<=10; i++)
        obj[i] = 0;
    
    return obj;
}

const countWaiting = (waitingIO) => Object.keys(waitingIO.connected).length;

module.exports = {
    init,
    destroy,
    gameStart,
}