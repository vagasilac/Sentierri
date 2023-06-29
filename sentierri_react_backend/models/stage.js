const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Stage = sequelize.define('Stage', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    },
  {
    sequelize,
    modelName: 'Stage',
    tableName: 'Stages',
  });

  return Stage;
};
