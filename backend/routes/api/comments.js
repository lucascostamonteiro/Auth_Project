const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth')
const { Comment } = require('../../db/models/comment');
const { Image } = require('../../db/models/image')
const { User } = require('../../db/models/user')

const router = express.Router();

// TODO VALIDATION MIDDLEWARE
const commentValidation = [
    check('comment')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Comment cannot be empty'),
]

// TODO get comments for a specific image
router.get('/', asyncHandler(async (req, res) => {
    const comments = Comment.findAll({ where: imageId });
    console.log('+++CMT+++', comments)
    res.json({ comments });
}));



// TODO post comments

// TODO edit a comment

// TODO delete a comment
// router.delete('/', asyncHandler(async (req, res) => {
//     const comment = await Comment.findByPk(req.body.id);
//     console.log('COMMENT', comment);
//     await image.destroy();
//     return res.json({ message: 'success' });
// }));

module.exports = router;
