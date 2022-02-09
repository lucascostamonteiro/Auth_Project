const router = require('express').Router();
const sessionRouter = require('./sessions');
const usersRouter = require('./user');
const imagesRouter = require('./images');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/images', imagesRouter);


module.exports = router;
