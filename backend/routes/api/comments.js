const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Comment } = require('../../db/models/comment');

const router = express.Router();

// TODO VALIDATION MIDDLEWARE
const commentValidation = [
    check('comment')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Comment must have at least 1 character'),
]

// TODO post comments
router.get('/', asyncHandler(async (req, res) => {
    console.log('+++CMT+++', req.body)
    const comments = await Comment.findAll();
    res.json(comments);
}));

// TODO get comments for a specific image

// TODO edit a comment

// TODO delete a comment
router.delete('/', asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.body.id);
    console.log('COMMENT', comment);
    await image.destroy();
    return res.json({ message: 'success' });
}));

module.exports = router;
