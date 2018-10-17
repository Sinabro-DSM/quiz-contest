const express = require('express');
const router = express.Router();

router.use('/client', require('./client'))
    .use('/admin', require('./admin'))
    .use('/docs', require('./docs'));

module.exports = router;