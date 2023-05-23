'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Store_Ranks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      store_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stores',
          key: 'id',
        },
        allowNull: false,
      },
      rank_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Ranks',
          key: 'id',
        },
        allowNull: false,
      },
      discount: {
        type: Sequelize.DOUBLE,
      },
      point: {
        type: Sequelize.DOUBLE,
      },
      max_point: {
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Store_Ranks');
  },
};
