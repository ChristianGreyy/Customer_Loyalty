'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Stores', 'isActive', 'is_active');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Stores', 'isActive', 'is_active');
  },
};
