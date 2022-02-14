'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Comments', [
      { userId: 1, imageId: 1, comment: "just beautiful!", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageId: 1, comment: "fantastic atmosphere!", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageId: 2, comment: "can't wait to go back for Libertadores!", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageId: 2, comment: "just beautiful!", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageId: 3, comment: "fantastic atmosphere!", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageId: 3, comment: "beautiful!", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageId: 4, comment: "cool!", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, imageId: 4, comment: "awesome!", createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
