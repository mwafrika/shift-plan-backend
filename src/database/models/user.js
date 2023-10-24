const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Company, {
        foreignKey: "companyId",
        as: "company"
      });

      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "role"
      });
      User.belongsTo(models.Department, {
        foreignKey: "departmentId",
        as: "department"
      });
      User.hasMany(models.Absence, {
        foreignKey: "userId",
        as: "absences"
      });

      User.belongsToMany(models.Shift, {
        through: models.EmployeeShift,
        foreignKey: "userId",
        otherKey: "shiftId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });

      User.hasMany(models.EmployeeShift, {
        foreignKey: "userId",
        as: "shifts"
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      companyId: DataTypes.INTEGER,
      departmentId: DataTypes.INTEGER,
      isActive: {
        type: DataTypes.BOOLEAN,
        values: [true, false],
        defaultValue: false
      },
      description: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true
    }
  );
  return User;
};
