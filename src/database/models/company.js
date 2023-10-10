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
      // define association here
    }
  }
  Company.init(
    {
      company_name: DataTypes.STRING,
      company_address: DataTypes.STRING,
      company_city: DataTypes.STRING,
      company_country: DataTypes.STRING,
      status: DataTypes.ENUM("pending", "approved", "denied"),
      company_description: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      company_phone: DataTypes.STRING,
      company_email: DataTypes.STRING,
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
