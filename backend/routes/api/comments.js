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

// TODO get comments for a specific image
router.get('/:imageId', asyncHandler(async (req, res) => {
    const { imageId } = req.params;
    const comments = await Comment.findAll({ where: { imageId }, include: User });
    res.json(comments);
}));



// TODO post comments
router.post('/', commentValidation, asyncHandler(async (req, res) => {

}))
// TODO edit a comment
router.put('/', commentValidation, asyncHandler(async (req, res) => {

}))

// TODO delete a comment
// router.delete('/', asyncHandler(async (req, res) => {
//     const comment = await Comment.findByPk(req.body.id);
//     console.log('COMMENT', comment);
//     await comment.destroy();
//     return res.json({ message: 'success' });
// }));

module.exports = router;
