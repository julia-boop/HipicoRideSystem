'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('inscripciones', {
        id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            references: {
                model:'usuarios',
                key:'id'
            }
        },
        prueba_id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            references: {
                model:'pruebas',
                key:'id'
            }
        },
        categoria_id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            references: {
                model:'categorias',
                key:'id'
            }
        },
        caballo: {
              type: Sequelize.DataTypes.STRING(150),
              allowNull: false
        },
        pais: {
            type: Sequelize.DataTypes.STRING(150),
            allowNull: false
        },
        club: {
            type: Sequelize.DataTypes.STRING(150),
            allowNull: false
        },
        
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('inscripciones')
  }
};