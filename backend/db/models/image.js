'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Image.associate = function (models) {
    // TODO DOUBLE CHECK THIS
    Image.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Image;
};
