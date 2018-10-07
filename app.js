const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('dotenv').config();

const port = process.env.PORT;

io.on('connection', (socket) => {

});

app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(require('./routes'));

app.listen(port, () => console.log(`server start at ${port}`));