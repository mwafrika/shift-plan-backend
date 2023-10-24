const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Department.hasMany(models.User, {
        foreignKey: "departmentId",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      });

      Department.belongsTo(models.Company, {
        foreignKey: "companyId",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      });
    }
  }
  Department.init(
    {
      departmentName: DataTypes.STRING,
      departmentManager: DataTypes.STRING,
      departmentDescription: DataTypes.TEXT,
      companyId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Department",
      freezeTableName: true
    }
  );
  return Department;
};
