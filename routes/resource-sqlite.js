"use strict"

const router = require('express').Router();

//const postHandler = require('./database/utils/post-handler-dinh');
const postHandler = require('../utils/post-handler-dinh');
const gettHandler = require('../utils/get-handler-dinh');

router.post('/confirm'
    , postHandler.postConfirm
);
router.post('/register'
    , postHandler.postRegister
);
router.post('/check-login'
    , postHandler.postLogin
);
router.get('/get-users'
    , gettHandler.getUsers
);

module.exports = router;