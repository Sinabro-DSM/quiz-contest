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


//socket.io
const adminModule= require('./socket/admin');
const waitingModule= require('./socket/waiting');
const participantModule = require('./socket/participant');

const adminIO = io.of('/admin');
const waitingIO = io.of('/waiting');
const participantIO = io.of('/participant');

adminIO.on('connection', (adminSocket) => {
    console.log('admin connection');
    adminModule.init(adminSocket, waitingIO, redisClient);
    adminSocket.on('disconnect', () => adminModule.destroy());
});

waitingIO.on('connection', (waitingSocket) => {
    console.log('connection');
    waitingModule.init(waitingSocket, adminIO, redisClient);
    waitingSocket.on('disconnect', () => waitingModule.destroy(adminIO));
});

participantIO.on('connection', (participantSocket) => {
    participantModule.init(participantSocket);
    participantSocket.on('disconnect', () => participantModule.destroy());
});


//api
app.use((req, res, next) => {
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