'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('urls', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      short_code: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      long_url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      expiry: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.sequelize.query(
      'ALTER SEQUENCE urls_id_seq RESTART WITH 10001;',
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('urls');
  },
};
