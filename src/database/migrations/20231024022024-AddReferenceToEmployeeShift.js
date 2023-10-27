"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("EmployeeShift", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.changeColumn("EmployeeShift", "shiftId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Shift",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.changeColumn("User", "roleId", {
      type: Sequelize.INTEGER,
      defaultValue: 2,
    });

    await queryInterface.changeColumn("User", "departmentId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Department",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.changeColumn("Department", "companyId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Company",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.changeColumn("Absence", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {},
};