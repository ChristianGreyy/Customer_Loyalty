'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Stores', 'bronze_discount', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('Stores', 'silver_discount', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('Stores', 'golden_discount', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('Stores', 'max_point', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('Stores', 'bronze_point', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('Stores', 'silver_point', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('Stores', 'golden_point', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('Stores', 'minium_money', {
      type: Sequelize.DOUBLE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Stores', 'bronze_discount');
    await queryInterface.removeColumn('Stores', 'silver_discount');
    await queryInterface.removeColumn('Stores', 'golden_discount');
    await queryInterface.removeColumn('Stores', 'max_point');
    await queryInterface.removeColumn('Stores', 'bronze_point');
    await queryInterface.removeColumn('Stores', 'golden_point');
    await queryInterface.removeColumn('Stores', 'minium_money');
  },
};
