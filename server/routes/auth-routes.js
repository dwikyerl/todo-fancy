const router = require('express').Router();
const { authControllers } = require('./../controllers');
const { catchErrors } = require('./../handlers/errorHandlers');

router.post('/signin', catchErrors(authControllers.signin));
router.post('/fbSignin', catchErrors(authControllers.fbSignin));

module.exports = router;
