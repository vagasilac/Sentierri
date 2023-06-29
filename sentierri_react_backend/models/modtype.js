const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ModType = sequelize.define('ModType', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name_ro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  {
    sequelize,
    modelName: 'ModType',
    tableName: 'ModTypes',
  });

  return ModType;
};
