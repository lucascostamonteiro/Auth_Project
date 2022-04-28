'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.TEXT,
    content: DataTypes.TEXT
  }, {});
  Image.associate = function (models) {

    Image.belongsTo(models.User, { foreignKey: 'userId' });
    Image.hasMany(models.Comment, { foreignKey: 'imageId' });
    Image.hasMany(models.Favorite, { foreignKey: 'imageId' });
  };
  return Image;
};
