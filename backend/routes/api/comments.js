const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Comment, User } = require('../../db/models/')


const router = express.Router();

const commentValidation = [
    check('comment')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Please provide a comment'),
]

// get comments for a specific image
router.get('/:imageId', asyncHandler(async (req, res) => {
    const { imageId } = req.params;
    const comments = await Comment.findAll({ where: { imageId }, include: User });
    res.json(comments);
}));



router.post('/', commentValidation, asyncHandler(async (req, res) => {
    const { userId, imageId, commentData } = req.body;
    const comment = await Comment.create({ userId, imageId, comment: commentData });
    const newComment = await Comment.findByPk(comment.id, { include: [User] })
    res.json(newComment);
}))


router.put('/', commentValidation, asyncHandler(async (req, res) => {
    const { id, userId, imageId, comment } = req.body;
    await Comment.update({ userId, imageId, comment }, { where: { id } });
    const newComment = await Comment.findByPk(id, { include: [User] });
    res.json(newComment);
}))

router.delete('/', asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.body.id);
    await comment.destroy();
    return res.json(comment);
}));

module.exports = router;
