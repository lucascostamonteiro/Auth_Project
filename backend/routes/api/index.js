const router = require('express').Router();
const sessionRouter = require('./sessions')
const usersRouter = require('./user');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);


module.exports = router;
