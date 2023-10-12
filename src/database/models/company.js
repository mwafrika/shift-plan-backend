const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.User, {
        foreignKey: 'companyId',
        as: 'users',
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
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
        type: DataTypes.ENUM('pending', 'approved', 'denied'),
        defaultValue: 'pending',
      },
      companyDescription: DataTypes.TEXT,
      companyPhone: DataTypes.STRING,
      companyEmail: DataTypes.STRING,
      logo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Company',
      freezeTableName: true,
    },
  );
  return Company;
};
