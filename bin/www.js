const server = require('../app').server;
require('dotenv').config();

const port = process.env.PORT;

server.listen(port, () => console.log(`server started at ${port}`));