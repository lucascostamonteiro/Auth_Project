const express = require('express');
const asyncHandler = require('express-async-handler');

const { Image, User, Favorite } = require('../../db/models');

const router = express.Router();

router.get('/:userId', asyncHandler(async function (req, res) {
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

module.exports = router;
