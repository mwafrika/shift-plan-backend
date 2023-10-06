const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      photo: DataTypes.STRING,
      roleId: DataTypes.UUID,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      departmentId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
    },
  );
  return User;
};
