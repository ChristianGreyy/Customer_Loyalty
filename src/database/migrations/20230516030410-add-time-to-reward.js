'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Rewards', 'start_time', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('Rewards', 'end_time', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Rewards', 'start_time');
    await queryInterface.removeColumn('Rewards', 'end_time');
  },
};
