const fs = require('fs');
const {promisify} = require('util');
const fwrite = promisify(fs.appendFile);

const login = async(req, res) => {
    const {nickname, code} = req.body;
    const {remoteAddress} = req.connection;

    const value = {
        nickname,
        ip: remoteAddress,
        score: 0
    }

    try {
        const isCodeWrongVal = await isCodeWrong(code, req.cache);
        const isExistNicknameVal = await isExistNickname(nickname, remoteAddress, req.cache);

        if(isCodeWrongVal == false && isExistNicknameVal == false){
            await req.cache.select(0);
            await req.cache.hmset(remoteAddress, value);

            return res.status(200).end();
        }
        else if(isCodeWrongVal == true){
            return res.status(404).json({"messege":"false code"}).end();
        }
        else {
            return res.status(404).json({"messege":"already exist nickname"}).end();
        }
    } catch(e) {
        console.error(e);
        return res.status(500).end();
    }
};

const personalInfo = async (req, res) => {
    const {name, phoneNum} = req.body;

    const fileName = './인적사항.txt';
    const content = name+': '+phoneNum+'\n';

    try {
        await fwrite(fileName, content);
        res.status(200).end();
    } catch(e) {
        console.log(e);
        res.status(500).json({message: e}).end();
    }

};

const isCodeWrong = async(code, redisClient) => {
    try{
        await redisClient.select(1);
        const authCode = await redisClient.get('code');
        if(code==authCode){
            console.log('success');
            return false;
        } else {
            return true;
        }
    }
    catch(e){
        console.error(e);
        return true;
    }
};

const isExistNickname = async(nickname, ip, redisClient) => {
        try{
            await redisClient.select(0);
            const keys = await redisClient.keys('*');

            return keys.some(async(v) => {
                const result = await redisClient.hmget(nickname, v);
                if(nickname == result.nickname) 
                    return true;
                else 
                    return false;
            });
        }
        catch(e){
            console.log(e);
            return true;
        }
};

module.exports = {
    login,
    personalInfo,
};