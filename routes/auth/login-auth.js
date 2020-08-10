const router = require('express').Router();

const LoginHandler = require('../../handlers/admin/login-handler');

const postHandler = require('../../utils/post-handler');

router.post('/login'
    , postHandler.jsonProcess
    , LoginHandler.login
)

module.exports = router;