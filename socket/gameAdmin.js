const init = async (gameAdminSocket, gameAdminIO, redisClient)=>{
    const QNumber =0;
    await redisClient.select(2);
    await redisClient.set('QNumber',QNumber);
};

const questionChange = async (gameAdminSocket,gameAdminIO,redisClient,fs)=>{
    try{
        await redisClient.select(2);
        const QNumber = Number(await redisClient.get('QNumber'));
        const question = fs.readFileSync('./question/question_solution.txt');
        const array = question.toString().split("\n");
        const items = await redisClient.lrange('question', QNumber,QNumber);
        console.log(`item:${items}, question: ${array[items-1]}`);
        gameAdminSocket.emit('QNumber',items[QNumber]);
        gameAdminSocket.emit('QSolution',array[items-1]);
        await redisClient.set('QNumber', (QNumber+1).toString());
    }
    catch(e){
        console.log(e);
    }
};

const destroy = () => {
    
};

module.exports = {
    init,
    destroy,
    questionChange,
}