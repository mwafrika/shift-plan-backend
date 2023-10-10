"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Company.init(
    {
      companyUrl: DataTypes.STRING,
      companyName: DataTypes.STRING,
      companyAddress: DataTypes.STRING,
      companyCity: DataTypes.STRING,
      companyCountry: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("pending", "approved", "denied"),
        defaultValue: "pending",
      },
      companyDescription: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      companyPhone: DataTypes.STRING,
      companyEmail: DataTypes.STRING,
      logo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Company",
      freezeTableName: true,
    }
  );
  return Company;
};
