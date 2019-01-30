"use strict"

const router = require('express').Router();

const postHandler = require('../utils/post-handler-dinh');
const gettHandler = require('../utils/get-handler-dinh');

router.post('/confirm'
    , postHandler.postConfirm
);
router.post('/register'
, postHandler.postRegister
);
router.post('/json-user'
    , postHandler.jsonPost
);
router.get('/get-users'
    , gettHandler.getUsers
);

module.exports = router;