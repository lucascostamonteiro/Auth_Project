const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Image } = require('../../db/models');
const { Comment } = require('../../db/models');
const { User } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../aws-S3');

const router = express.Router();



// validations
const imageValidation = [
    check('imageUrl')
        .exists({ checkFalsy: true })
        .isURL()
        .withMessage('Please provide a valid url.'),
    handleValidationErrors,
];

const editValidation = [
    check('content')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Please provide a description.'),
    handleValidationErrors
]

// get images
router.get('/', asyncHandler(async (req, res) => {
    const images = await Image.findAll();
    res.json(images);
}));

// post image
// URL ROUTE
// router.post('/', imageValidation, asyncHandler(async (req, res) => {
//     const image = await Image.create(req.body);
//     res.json(image);
// }));

// AWS S3 ROUTE
router.post('/', singleMulterUpload("image"), asyncHandler(async (req, res) => {
    const { userId, content, location } = req.body;
    const postImageUrl = await singlePublicFileUpload(req.file);
    const newImage = await Image.create({
        userId,
        content,
        imageUrl: postImageUrl,
        location,
    });
    const resImage = await Image.findByPk(newImage.id, {
        include: { model: Comment, include: [User] },
    });
    res.json(resImage);
}));


// delete image
router.delete('/', asyncHandler(async (req, res) => {
    const image = await Image.findByPk(req.body.id);
    await image.destroy();
    return res.json({ message: 'success' });
}));


// edit image
router.put('/', editValidation, imageValidation, asyncHandler(async (req, res) => {
    const image = await Image.findByPk(req.body.id);
    image.set(req.body);
    await image.save();
    res.json(image);
}))



module.exports = router;
