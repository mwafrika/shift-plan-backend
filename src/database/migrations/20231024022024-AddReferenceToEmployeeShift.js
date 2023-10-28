/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("EmployeeShift", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "User",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    await queryInterface.changeColumn("EmployeeShift", "shiftId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Shift",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    await queryInterface.changeColumn("User", "roleId", {
      type: Sequelize.INTEGER,
      defaultValue: 2
    });

    await queryInterface.changeColumn("User", "departmentId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Department",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    await queryInterface.changeColumn("Department", "companyId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Company",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    await queryInterface.changeColumn("Absence", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "User",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    // rename employee to shiftName
    await queryInterface.renameColumn("Shift", "employee", "shiftName");

    // Add companyId to shift table
    await queryInterface.addColumn("Shift", "companyId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Company",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    await queryInterface.changeColumn("User", "roleId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Role",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    // Add status to the Absence table
    await queryInterface.addColumn("Absence", "status", {
      type: Sequelize.ENUM("pending", "approved", "denied"),
      defaultValue: "pending"
    });

    // remove startDate, endDate from shift then add them to employeeShift table
    await queryInterface.removeColumn("Shift", "startDate");
    await queryInterface.removeColumn("Shift", "endDate");
    await queryInterface.addColumn("EmployeeShift", "startDate", {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn("EmployeeShift", "endDate", {
      type: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {}
};
