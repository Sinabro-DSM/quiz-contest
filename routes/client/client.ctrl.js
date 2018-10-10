const fs = require('fs');
const {promisify} = require('util');
const fwrite = promisify(fs.appendFile);

const nickname = (req, res) => {
    const {nickname} = req.body;

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

module.exports = {
    nickname,
    personalInfo,
};