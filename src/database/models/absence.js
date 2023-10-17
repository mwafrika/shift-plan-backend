const {
  Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Absence extends Model {
    static associate(models) {
      Absence.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "users",
        onDelete: "NULL",
        onUpdate: "NULL"
      });
    }
  }
  Absence.init({
    reason: DataTypes.TEXT,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Absence"
  });
  return Absence;
};
