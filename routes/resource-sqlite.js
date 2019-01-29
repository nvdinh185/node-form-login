"use strict"

const router = require('express').Router();

const postHandler = require('../utils/post-handler-dinh');

router.post('/json-user'
    , postHandler.jsonPost
);
router.post('/register'
    , postHandler.postRegister
);

module.exports = router;