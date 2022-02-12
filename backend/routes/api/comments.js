const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth')
const { Comment, User } = require('../../db/models/')


const router = express.Router();

// TODO VALIDATION MIDDLEWARE
const commentValidation = [
    check('comment')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Comments cannot be empty'),
]

// get comments for a specific image
router.get('/:imageId', asyncHandler(async (req, res) => {
    const { imageId } = req.params;
    const comments = await Comment.findAll({ where: { imageId }, include: User });
    res.json(comments);
}));



// TODO post comments
router.post('/', commentValidation, asyncHandler(async (req, res) => {
    const { userId, imageId, commentData } = req.body;
    const comment = await Comment.create({ userId, imageId, comment: commentData, include: [User] });
    const newComment = await Comment.findByPk(comment.dataValues.id, { include: [User] })
    const user = await User.findByPk(userId);
    comment.dataValues.User = user;
    const username = user.dataValues.username;
    console.log('***COMMENT***', newComment)
    // console.log('+++USER+++', username);
    res.json({comment, username});
}))

// TODO edit a comment
// router.put('/', commentValidation, asyncHandler(async (req, res) => {
//     const comment = await Comment.findByPk(req.body.id);
//     comment.set(req.body);
//     await comment.save();
//     res.json(comment);
// }))

// TODO delete a comment
// router.delete('/', asyncHandler(async (req, res) => {
//     const comment = await Comment.findByPk(req.body.id);
//     console.log('COMMENT', comment);
//     await comment.destroy();
//     return res.json({ message: 'success' });
// }));

module.exports = router;
