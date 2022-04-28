const express = require('express');
const asyncHandler = require('express-async-handler');

const { Image, User, Favorite } = require('../../db/models');

const router = express.Router();

// get all
router.get('/:userId', asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const favorites = await Favorite.findAll({
    where: {
      userId
    },
  })
  res.json(favorites);
}))

// get
router.get('/image/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const favorites = await Favorite.findAll({
    where: {
      imageId: id,
    }
  })
  res.json(favorites);
}))

// post
router.post('/', asyncHandler(async (req, res) => {
  const favorite = await Favorite.create(req.body);
  res.json(favorite);
}))


// delete
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const unfavorite = await Favorite.findOne({
    where: {
      id
    }
  })
  await unfavorite.destroy();
  res.json(unfavorite);
  res.status(200).end();
}))

module.exports = router;
