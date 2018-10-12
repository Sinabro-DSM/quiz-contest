const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {promisify}= require('util');
const path = require('path'); 
const redis = require('redis');
const redisClient = redis.createClient(6379, 'localhost');
redisClient.set = promisify(redisClient.set);
redisClient.get = promisify(redisClient.get);
redisClient.keys = promisify(redisClient.keys);
redisClient.rpush = promisify(redisClient.rpush);
redisClient.lrange = promisify(redisClient.lrange);
redisClient.select = promisify(redisClient.select);
redisClient.flushall = promisify(redisClient.flushall);


//socket.io
const gameAdminModule= require('./socket/gameAdmin');
const waitingAdminModule= require('./socket/waitingAdmin');
const waitingModule= require('./socket/waiting');
const participantModule = require('./socket/participant');

const gameAdminIO = io.of('/gameAdmin');
const waitingAdminIO = io.of('/waitingAdmin');
const waitingIO = io.of('/waiting');
const participantIO = io.of('/participant');

gameAdminIO.on('connection',(gameAdminSocket)=>{
    console.log('gameAdmin connection');
    gameAdminModule.init();
    gameAdminSocket.on('disconnect',()=>gameAdminModule.destroy());
})

waitingAdminIO.on('connection', (waitingAdminSocket) => {
    console.log('waitingAdmin connection');
    waitingAdminModule.init(waitingAdminSocket, waitingIO, redisClient);
    waitingAdminSocket.on('disconnect', () => waitingAdminModule.destroy());
});

waitingIO.on('connection', (waitingSocket) => {
    console.log('connection');
    waitingModule.init(waitingSocket, waitingAdminIO, redisClient);
    waitingSocket.on('disconnect', () => waitingModule.destroy(waitingAdminIO));
});

participantIO.on('connection', (participantSocket) => {
    participantModule.init(participantSocket);
    participantSocket.on('disconnect', () => participantModule.destroy());
});


//api
app.use((req, res, next) => {
    req.cache=redisClient;
    req.io = io;
    next();
});
app.use(express.json())
    .use(express.static(path.join(__dirname, './public')))
    .use(express.urlencoded({extended: true}))
    .use('/api', require('./routes'));

    
module.exports = {
    server,
}