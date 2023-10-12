/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('User', 'companyId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Company',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('User', 'companyId', {
      type: Sequelize.INTEGER,
    });
  },
};
