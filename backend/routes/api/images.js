import { express } from 'express';
import asyncHandler from 'express-async-handler';
import { handleValidationErrors } from '../../utils/validation';
import { check } from 'express-validator';
import { Image } from '../../db/models'

const router = express.Router();

// TODO VALIDATION MIDDLEWARE
const imageValidation = [
    check('imageUrl')
        .exists({ checkFalsy: true })
        .isURL()
        .withMessage('Please provide a valid url.'),
    handleValidationErrors,
];
// TODO get images
router.get('/', asyncHandler(async (req, res) => {
    const images = await Image.findAll();
    console.log('DEBUG', images)
    res.json(images);
}));

// TODO post image
router.post('/', imageValidation, asyncHandler(async (req, res) => {
    const image = await Image.create(req.body);
    res.json(image)
}));

// TODO delete image
router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    const image = await Image.findByPk(req.params.id);
    console.log('DEBUG2', image);
    await image.destroy();
    res.status(204).end();
}));

//TODO edit content for a specific image
// router.put('/:id(\\d+', asyncHandler(async (req, res) => {
//     const {imageId, content} = req.body
// }))



module.exports = router;
