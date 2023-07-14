'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Laptop',
        price: 999.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'TV',
        price: 799.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smartphone',
        price: 699.99,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
