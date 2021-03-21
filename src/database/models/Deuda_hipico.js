module.exports = (sequelize, dataTypes) => {
    const alias = 'Deuda_hipico';
    const cols = {
      id: {
        type: dataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      hipico_id: {
        type: dataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
      },
      concurso_id: {
        type: dataTypes.INTEGER(10).UNSIGNED,
        allowNull: false
      },
      mensual: {
        type: dataTypes.INTEGER(10)
      },
      total: {
          type: dataTypes.INTEGER(100),
          allowNull:true
      }
    };
    const config = {
      tableName: 'deudas_hipicos',
      timestamps: true,
      underscored: true
    };
    const Deuda_hipico = sequelize.define(alias, cols, config);  
    
    return Deuda_hipico;
  }