'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Album.associate = function (models) {
    // TODO DOUBLE CHECK THIS
    Album.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Album;
};
