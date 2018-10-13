const init = (participantSocket) => {
    console.log(`participant connection`);
};

const correctReply = async(data, participantSocket, redisClient) => {
    try {
        await redisClient.select(1);
        const grade = Number(await redisClient.hmget('answerSeq', data.num));

        const obj = {};
        obj[data.num] = grade+1;

        await redisClient.hmset('answerSeq', obj);

        const {address} = participantSocket.handshake;
        const plusScore = 100 - grade*5;

        await redisClient.select(0);
        const oldScore = Number(await redisClient.hmget(address, 'score'));
        const score =  {
            score: oldScore + plusScore
        };
        await redisClient.hmset(address, score);

        participantSocket.emit('plusScore', {plusScore: plusScore});
    } catch(e) {
        console.error(e);
    }
};

const destroy = () => {

};

module.exports = {
    init,
    correctReply,
    destroy,
}