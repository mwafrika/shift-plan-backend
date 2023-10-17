const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Company, {
        foreignKey: "companyId",
        as: "company"
      });

      User.hasMany(models.Absence, {
        foreignKey: "UserId",
        as: "users",
        onDelete: "CASCADE",
        onUpdate: "NULL"
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
