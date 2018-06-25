const router = require('express').Router();
const { authControllers } = require('./../controllers');
const { catchErrors } = require('./../handlers/errorHandlers');

router.post('/signin', catchErrors(authControllers.signin));

module.exports = router;
