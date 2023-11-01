const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    static associate(models) {
      Shift.belongsToMany(models.User, {
        through: models.EmployeeShift,
        foreignKey: "shiftId",
        otherKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });

      Shift.hasMany(models.EmployeeShift, {
        foreignKey: "shiftId",
        as: "employees"
      });

      Shift.belongsTo(models.Company, {
        foreignKey: "companyId",
        as: "company"
      });
    }
  }
  Shift.init(
    {
      shiftName: DataTypes.STRING,
      startTime: DataTypes.STRING,
      endTime: DataTypes.STRING,
      companyId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Shift",
      freezeTableName: true
    }
  );
  return Shift;
};
