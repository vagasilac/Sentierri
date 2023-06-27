const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Model = sequelize.define('Model', {
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
    },
  {
    sequelize,
    modelName: 'Model',
    tableName: 'Models',
  });

  return Model;
};
