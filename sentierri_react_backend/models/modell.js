const { Sequelize, DataTypes } = require('sequelize');
const ModType = require('./modtype');

module.exports = (sequelize) => {
  const Modell = sequelize.define('Modell', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,    
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    patterns: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    parentModTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ModType',
        key: 'id',
      },
      },
    parentStageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Stage',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Modell',
    tableName: 'Modells',
  });

  return Modell;
};
