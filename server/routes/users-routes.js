const router = require('express').Router();
const { usersControllers, authControllers } = require('./../controllers');
const { catchErrors } = require('./../handlers/errorHandlers');

router.post(
  '/signup',
  usersControllers.validateRegister,
  catchErrors(usersControllers.signUp),
  catchErrors(authControllers.signin)
);

module.exports = router;
