/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("User", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          len: {
            args: [3, 20],
            msg: "Username must be between 3 and 20 characters.",
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isEmail: true,
          len: {
            args: [3, 50],
            msg: "Email must be between 3 and 50 characters.",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          is: /^[0-9a-f]{64}$/i,
          len: {
            args: [6, 20],
            msg: "Password must be between 6 and 20 characters.",
          },
        },
      },
      photo: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: false,
          isUrl: true,
          msg: "Photo must be a url",
        },
      },
      roleId: {
        type: Sequelize.INTEGER,
        // validate: {
        //   notEmpty: false,
        //   isUUID: 4,
        // },
      },
      phone: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: false,
          is: /^\+?[0-9()\-\s]+$/,
          len: {
            args: [7, 15],
            msg: "Phone must be between 7 and 15 characters.",
          },
        },
      },
      address: {
        type: Sequelize.TEXT,
        validate: {
          len: {
            args: [3, 100],
            msg: "Address must be between 3 and 100 characters.",
          },
        },
      },
      country: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [3, 20],
            msg: "Country must be between 3 and 20 characters.",
          },
        },
      },
      city: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [3, 20],
            msg: "City must be between 3 and 20 characters.",
          },
        },
      },
      departmentId: {
        type: Sequelize.INTEGER,
        // validate: {
        //   notEmpty: false,
        //   isUUID: 4,
        // },
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
    await queryInterface.dropTable("User");
  },
};
