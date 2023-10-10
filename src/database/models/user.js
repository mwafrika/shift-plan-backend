const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "role",
      });

      // User.belongsTo(models.Department, {
      //   foreignKey: "departmentId",
      //   as: "department",
      // });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      profile_picture: DataTypes.STRING,
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Role",
          key: "id",
        },
      },
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      departmentId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
    }
  );
  return User;
};
