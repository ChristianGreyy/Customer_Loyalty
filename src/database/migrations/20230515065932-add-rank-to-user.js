'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'rank', {
      type: Sequelize.ENUM('bronze', 'silver', 'golden'),
      allowNull: false,
      defaultValue: 'bronze',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'rank');
  },
};
