'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('ganancias', {
        id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
          },
          hipico_id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            references: {
                model: 'hipicos',
                key: 'id'
            }
          },
          total: {
            type: Sequelize.DataTypes.INTEGER(10),
            allowNull: false
          }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ganancias')
  }
};