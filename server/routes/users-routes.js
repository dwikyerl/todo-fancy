const router = require('express').Router();
const { usersControllers } = require('./../controllers');
const { catchErrors } = require('./../handlers/errorHandlers');
const usersMiddlewares = require('./../middlewares/users-middlewares');

router.post(
  '/signup',
  usersMiddlewares.validateRegister,
  catchErrors(usersControllers.signUp)
);

module.exports = router;
