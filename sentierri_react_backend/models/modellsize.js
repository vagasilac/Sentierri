const { Sequelize, sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ModellSize = sequelize.define('ModellSize',{
      modellId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Modell',
          key: 'id',},
    },
      sizeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Size',
          key: 'id',},
      },},
    {
      sequelize,
      modelName: 'ModellSize',
      tableName: 'ModellSize',
    }
);

return ModellSize;
};