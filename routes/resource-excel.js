const router = require('express').Router();

const handlers = require('../handlers/excel-handler');

router.get('/json-users', handlers.getUsers);

module.exports = router;