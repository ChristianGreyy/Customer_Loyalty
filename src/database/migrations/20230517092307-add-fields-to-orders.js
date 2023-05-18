'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Order_Details', 'total_money', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('Order_Details', 'total_point', {
      type: Sequelize.FLOAT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Order_Details', 'total_money');
    await queryInterface.removeColumn('Order_Details', 'total_point');
  },
};
