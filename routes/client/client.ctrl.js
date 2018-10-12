const fs = require('fs');
const {promisify} = require('util');
const fwrite = promisify(fs.appendFile);

const login = (req, res) => {
    const {nickname, code} = req.body;
    if(authCode(code,req.cache) && authNickname(nickname,req.cache)){
        return res.status(200).end();
    }
    else if(!authCode(code,req.cache)){
        return res.status(404).json({"messege":"false code"}).end();
    }
    else {
        return res.status(404).json({"messege":"already exist nickname"}).end();
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
        // for(let i=0;i<keys.length;i++){
        //     if(nickname==keys) return false;
        // }
        // return true;
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