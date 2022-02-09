const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Image } = require('../../db/models');

const router = express.Router();

// TODO VALIDATION MIDDLEWARE
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
    const{imageUrl, content} = req.body
    // TODO CHECK 
    const image = await Image.create(req.body);
    res.json(image);
}));

// TODO delete image
router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    const image = await Image.findByPk(req.params.id);
    // console.log('REQQQ', req.params)
    // console.log('+++DELETE+++', image);
    await image.destroy();
    res.status(204).end();
}));

//TODO edit content for a specific image
// router.put('/:id(\\d+', asyncHandler(async (req, res) => {
//     const {imageId, content} = req.body
// }))



module.exports = router;
