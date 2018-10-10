const express = require('express');
const router = express.Router();

router.use('/client', require('./client'))
    .use('/admin', require('./admin'))
    .use('/dosc', require('./dosc'));

module.exports = router;