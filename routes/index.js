const express = require('express');
const router = express.Router();

router.use('/docs', require('./dosc'));

module.exports = router;