'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Stores', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Stores', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Stores', 'email');
    await queryInterface.removeColumn('Stores', 'password');
  },
};
