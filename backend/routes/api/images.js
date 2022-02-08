const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Image } = require('../../db/models/image');

const router = express.Router();

// TODO VALIDATION MIDDLEWARE

// TODO get images
router.get('/', asyncHandler(async (req, res) => {
    const images = await Image.findAll();
    res.json(images);
}));

// TODO post image


// TODO delete image




module.exports = router;
