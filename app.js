const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const port = process.env.PORT;

app.use(require('./routes'));

app.listen(port, () => console.log(`server start at ${port}`));