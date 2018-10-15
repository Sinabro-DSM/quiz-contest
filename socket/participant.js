const fs = require('fs');

const init = async(participantSocket, participantIO, redisClient) => {
    console.log(`participant connection`);

    const socketIdObj = {
        socketId: participantSocket.id.split('#')[1]
    };
    const {remoteAddress} = participantSocket.request.connection;

    try {
        await redisClient.select(0);
        await redisClient.hmset(remoteAddress, socketIdObj);
        nextQuestion(participantSocket, participantIO, redisClient);
    } catch(e) {
        console.error(e);
    }
};

const correctReply = async(participantSocket, participantIO, redisClient) => {
    try {
        await redisClient.select(1);
        const QNumber = Number(await redisClient.get('QNumber'));
        const grade = Number(await redisClient.hmget('answerSeq', QNumber+1));

        const obj = {};
        obj[QNumber] = grade+1;

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

        if(grade+1 == countParticipant(participantIO)) {
            nextQuestion(participantSocket, redisClient);
        }
    } catch(e) {
        console.error(e);
    }
};

const incorrectReply = async(participantSocket, participantIO, redisClient) => {
    try {
        await redisClient.select(1);
        const QNumber = Number(await redisClient.get('QNumber'))
        const grade = Number(await redisClient.hmget('answerSeq', QNumber+1));

        const obj = {};
        obj[QNumber] = grade+1;

        await redisClient.hmset('answerSeq', obj);

        if(grade+1 == countParticipant(participantIO)) {
            nextQuestion(participantSocket, redisClient);
        }

    } catch(e) {
        console.error(e);
    }
}

const destroy = () => {

};

const nextQuestion = async(participantSocket, redisClient) => {
    await redisClient.select(1);
    const QNumber = Number(await redisClient.get('QNumber'));

    if(QNumber == 10) {
        try {
            await redisClient.select(0);
            const keys = await redisClient.keys('*');
            const gradeArr = [0];
            const nicknameArr = [];

            for(let v of keys) {
                const score = Number(await redisClient.hmget(v, 'score'));
                const nickname = (await redisClient.hmget(v, 'nickname')).toString();

                for(let i in gradeArr) {
                    if(score >= gradeArr[i] || i == gradeArr.length-1) {
                        gradeArr.unshift(score);
                        nicknameArr.unshift(nickname);
                        break;
                    }
                }
            }
            gradeArr.pop();
            participantSocket.emit('finishGame', {grade: gradeArr, nickname: nicknameArr});
        } catch(e) {
            console.error(e);
        }
    } else {
        const items = await redisClient.lrange('question', QNumber,QNumber);
        const question = await parseQuestion(items);
        participantSocket.emit('QSolution', question);
        await redisClient.set('QNumber', (QNumber+1).toString());
    }
};

const parseQuestion = (items) => {
    return new Promise((resolve) => {
        const question = fs.readFileSync('./question/'+items+'.json');
        resolve(JSON.parse(question));
    });
};

const countParticipant = (participantIO) => Object.keys(participantIO.connected).length;

module.exports = {
    init,
    correctReply,
    incorrectReply,
    destroy,
}