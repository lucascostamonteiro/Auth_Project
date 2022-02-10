const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Image } = require('../../db/models');

const router = express.Router();

// const imageValidation = [
//     check('imageUrl')
//         .exists({ checkFalsy: true })
//         .isURL()
//         .withMessage('Please provide a valid url.'),
//     handleValidationErrors,
// ];

// get images
router.get('/', asyncHandler(async (req, res) => {
    const images = await Image.findAll();
    res.json(images);
}));

// TODO post image
router.post('/', asyncHandler(async (req, res) => {
    const image = await Image.create(req.body);
    res.json(image);
}));

// TODO delete image
router.delete('/', asyncHandler(async (req, res) => {
    console.log('REQ', req.body)
    const image = await Image.findByPk(req.body.id);
    // console.log('+++DELETE+++', image);
    await image.destroy();
    return res.json({ message: 'success' });
}));

//TODO edit content for a specific image




module.exports = router;
