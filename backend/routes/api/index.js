const router = require('express').Router();
const sessionRouter = require('./sessions');
const usersRouter = require('./user');
const imagesRouter = require('./images');
const commentsRouter = require('./comments');
const favoritesRouter = require('./favorites')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/images', imagesRouter);
router.use('/comments', commentsRouter);
router.use('/favorites', favoritesRouter);


module.exports = router;
