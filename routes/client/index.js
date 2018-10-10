const express = require('express');
const router = express.Router();
const ctrl = require('./client.ctrl');

router.post('/nickname', ctrl.nickname)
    .post('/personalInfo', ctrl.personalInfo);

module.exports = router;