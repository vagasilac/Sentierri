const { Sequelize, sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ModellColor = sequelize.define('ModellColor',{
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
      },},
    {
      sequelize,
      modelName: 'ModellColor',
      tableName: 'ModellColor',
    }
);

return ModellColor;
};