const fs = require('fs');
const {promisify} = require('util');
const fwrite = promisify(fs.appendFile);

const login = async(req, res) => {
    const {nickname, code} = req.body;

    try {
        const authCodeResult = await authCode(code, req.cache);
        const authNicknameResult = await authNickname(nickname, req.cache);

        if(authCodeResult == true && authNicknameResult == true){
            return res.status(200).end();
        }
        else if(authCodeResult == false){
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

const authCode = async (code,redisClient)=>{
    try{
        await redisClient.select(1);
        const authCode = await redisClient.get('code');
        if(code==authCode){
            console.log('success');
            return true;
        } else {
            return false;
        }
    }
    catch(e){
        console.error(e);
        return false;
    }
}

const authNickname = async(nickname,redisClient)=>{
        try{
            await redisClient.select(0);
            const keys = await redisClient.keys('*');
            return keys.some(v=>v==nickname);
        }
        catch(e){
            console.log(e);
            return false;
        }
}

module.exports = {
    login,
    personalInfo,
};