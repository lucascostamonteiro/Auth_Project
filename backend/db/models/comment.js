'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Comment.associate = function (models) {
    // TODO DOUBLE CHECK THIS
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Image, { foreignKey: 'imageId' });
  };
  return Comment;
};
