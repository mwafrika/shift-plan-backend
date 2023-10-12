"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Company", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      companyUrl: {
        type: Sequelize.STRING,
      },
      companyName: {
        type: Sequelize.STRING,
      },
      companyAddress: {
        type: Sequelize.STRING,
      },
      companyCity: {
        type: Sequelize.STRING,
      },
      companyCountry: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("pending", "approved", "denied"),
        defaultValue: "pending",
      },
      companyDescription: {
        type: Sequelize.TEXT,
      },
      companyPhone: {
        type: Sequelize.STRING,
      },
      companyEmail: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
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
  async down(queryInterface) {
    await queryInterface.dropTable("Company");
  },
};
