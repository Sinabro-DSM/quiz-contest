const init = async (redisClient)=>{
    const QNumber =0;

    try {
        await redisClient.select(1);
        await redisClient.set('QNumber',QNumber);
    } catch(e) {
        console.error(e);
    }
};

const questionChange = async (gameAdminSocket, redisClient, fs)=>{
    try{
        await redisClient.select(1);
        const QNumber = Number(await redisClient.get('QNumber'));
        // const question = fs.readFileSync('./question/question_solution.txt');
        // const array = question.toString().split("\n");
        // const items = await redisClient.lrange('question', QNumber,QNumber);
        // console.log(`item:${items}, question: ${array[items-1]}`);
        // gameAdminSocket.emit('QNumber',items[QNumber]);
        // gameAdminSocket.emit('QSolution',array[items-1]);
        const items = await redisClient.lrange('question', QNumber,QNumber);
        const question = await parseQuestion(items, fs);
        gameAdminSocket.emit('QSolution', question);
        await redisClient.set('QNumber', (QNumber+1).toString());
    }
    catch(e){
        console.log(e);
    }
};

const destroy = () => {
    
};

const parseQuestion = (items, fs) => {
    return new Promise((resolve) => {
        const question = fs.readFileSync('./question/'+items+'.json');
        resolve(JSON.parse(question));
    });
};

module.exports = {
    init,
    destroy,
    questionChange,
}