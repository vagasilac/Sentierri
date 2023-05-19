'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      abbreviation: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('Categories');
  }
};
