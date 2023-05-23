'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Stores', 'bronze_discount');
    await queryInterface.removeColumn('Stores', 'silver_discount');
    await queryInterface.removeColumn('Stores', 'golden_discount');
    await queryInterface.removeColumn('Stores', 'max_point');
    await queryInterface.removeColumn('Stores', 'bronze_point');
    await queryInterface.removeColumn('Stores', 'silver_point');
    await queryInterface.removeColumn('Stores', 'golden_point');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
