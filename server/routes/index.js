const router = require('express').Router();
const authRoutes = require('./auth-routes');
const todosRoutes = require('./todos-routes');
const usersRoutes = require('./users-routes');

router.use('/', authRoutes);
router.use('/', usersRoutes);
router.use('/todos', todosRoutes);

module.exports = router;
