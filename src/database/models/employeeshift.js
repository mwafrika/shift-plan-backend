const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EmployeeShift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EmployeeShift.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      EmployeeShift.belongsTo(models.Shift, {
        foreignKey: "shiftId",
        as: "shift",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  }
  EmployeeShift.init(
    {
      userId: DataTypes.INTEGER,
      shiftId: DataTypes.INTEGER,
      description: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "EmployeeShift",
      freezeTableName: true
    }
  );
  return EmployeeShift;
};
