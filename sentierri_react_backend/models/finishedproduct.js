const { Sequelize, sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const FinishedProduct = sequelize.define('FinishedProduct',{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      modellId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Modell',
          key: 'id',},
    },
      colorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Color',
          key: 'id',},
      },
      sizeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Size',
          key: 'id',},
      },
    },
    {
      sequelize,
      modelName: 'FinishedProduct',
      tableName: 'FinishedProducts',
    }
);

return FinishedProduct;
};