const router = require('express').Router();
const { usersControllers } = require('./../controllers');
const { catchErrors } = require('./../handlers/errorHandlers');
const usersMiddlewares = require('./../middlewares/users-middlewares');
const authMiddlewares = require('./../middlewares/auth-middlewares');

router.post(
  '/signup',
  usersMiddlewares.validateRegister,
  catchErrors(usersControllers.signUp)
);

router.get(
  '/me',
  authMiddlewares.verifyToken,
  authMiddlewares.authorizeUser,
  usersControllers.userInfo
);

module.exports = router;
