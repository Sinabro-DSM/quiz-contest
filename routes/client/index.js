const express = require('express');
const router = express.Router();
const ctrl = require('./client.ctrl');

router.post('/login', ctrl.login)
    .post('/personalInfo', ctrl.personalInfo);

module.exports = router; 