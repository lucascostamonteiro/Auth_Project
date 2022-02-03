const router = require('express').Router();
const sessionRouter = require('./sessions')
const usersRouter = require('./user');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;
