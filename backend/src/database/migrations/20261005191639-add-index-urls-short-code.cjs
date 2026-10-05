'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('urls', ['short_code'], {
      name: 'idx_urls_short_code',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('urls', 'idx_urls_short_code');
  },
};
