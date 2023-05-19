const { Sequelize, sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Category = sequelize.define('Category',{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      abbreviation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'Categories',
    }
);

return Category;
};