'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'rank_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Ranks',
        key: 'id',
      },
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'rank_id');
  },
};
