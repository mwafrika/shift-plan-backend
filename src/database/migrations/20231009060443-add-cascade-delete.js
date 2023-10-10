"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("User", "roleId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Role",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("User", "roleId", {
      type: Sequelize.INTEGER,
    });
  },
};
