const router = require('express').Router();
const sessionRouter = require('./sessions');
const usersRouter = require('./user');
const imagesRouter = require('./images');
const commentsRouter = require('./comments');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/images', imagesRouter);
router.use('/comments', commentsRouter);


module.exports = router;
