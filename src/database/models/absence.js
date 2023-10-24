const {
  Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Absence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Absence.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      });
    }
  }
  Absence.init({
    reason: DataTypes.TEXT,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Absence",
    freezeTableName: true
  });
  return Absence;
};
