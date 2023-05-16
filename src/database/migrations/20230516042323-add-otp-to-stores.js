'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Stores', 'otp_code', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Stores', 'code_expire_time', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('Stores', 'is_code_used', {
      type: Sequelize.BOOLEAN,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Stores', 'otp_code');
    await queryInterface.removeColumn('Stores', 'code_expire_time');
    await queryInterface.removeColumn('Stores', 'is_code_used');
  },
};
