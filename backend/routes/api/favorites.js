const express = require('express');
const asyncHandler = require('express-async-handler');

const { Image, User, Favorite } = require('../../db/models');

const router = express.Router();

// get
router.get('/:userId', asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const favorites = await Favorite.findAll({
    where: {
      userId
    },
    include: [
      { model: Image, include: [{ model: User }, { model: Favorite }] }
    ],
  })

  const favoriteImages = favorites.map(favImage => favImage.Image);
  res.json(favoriteImages);
}))

// post
router.post('/', asyncHandler(async (req, res) => {
  const favorite = await Favorite.create(req.body);
  res.json(favorite);
}))

module.exports = router;


// delete
router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
  console.log('REQ.BODY', req.body);
    const unfavorite = await Favorite.findOne({
      where: {
        imageId: req.params.id,
        userId: req.body.userId
      }
    })

  await unfavorite.destroy();
    res.status(204).end();
  })
)

module.exports = router;
