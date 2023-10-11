<<<<<<< HEAD
const { Model } = require("sequelize");
=======
const { Model } = require('sequelize');
>>>>>>> 857f2e0 (show all users)

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.User, {
<<<<<<< HEAD
        foreignKey: "companyId",
        as: "users"
=======
        foreignKey: 'companyId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
>>>>>>> 857f2e0 (show all users)
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
        defaultValue: "pending"
      },
      companyDescription: DataTypes.TEXT,
      companyPhone: DataTypes.STRING,
      companyEmail: DataTypes.STRING,
      logo: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Company",
      freezeTableName: true
    }
  );
  return Company;
};
