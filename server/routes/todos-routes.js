const router = require('express').Router();
const { todosControllers } = require('./../controllers');
const authMiddlewares = require('./../middlewares/auth-middlewares');
const { catchErrors } = require('./../handlers/errorHandlers');

router
  .route('/')
  .post(
    authMiddlewares.verifyToken,
    catchErrors(authMiddlewares.authorizeUser),
    catchErrors(todosControllers.createTodo)
  )
  .get(
    authMiddlewares.verifyToken,
    catchErrors(authMiddlewares.authorizeUser),
    catchErrors(todosControllers.getAllTodos)
  );

router
  .route('/:todoId')
  .get(
    authMiddlewares.verifyToken,
    catchErrors(authMiddlewares.authorizeUser),
    catchErrors(todosControllers.getTodoById)
  )
  .put(
    authMiddlewares.verifyToken,
    catchErrors(authMiddlewares.authorizeUser),
    catchErrors(todosControllers.updateTodo)
  )
  .delete(
    authMiddlewares.verifyToken,
    catchErrors(authMiddlewares.authorizeUser),
    catchErrors(todosControllers.deleteTodo)
  );

module.exports = router;
