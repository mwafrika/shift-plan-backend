const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    static associate(models) {
      Shift.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE"
      });
    }
  }
  Shift.init(
    {
      employee: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      startTime: DataTypes.STRING,
      endTime: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Shift",
      freezeTableName: true
    }
  );
  return Shift;
};
