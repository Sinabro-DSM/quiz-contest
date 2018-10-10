const express = require('express');
const router = express.Router();
const ctrl = require('./admin.ctrl');

router.use('/', ctrl.start);

module.exports = router;