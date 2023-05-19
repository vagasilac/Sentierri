const { Sequelize, sequelize, DataTypes } = require('sequelize');
const Category = require('./category');

module.exports = (sequelize) => {
    const Subcategory = sequelize.define('Subcategory',{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Category,
          key: 'id',
        },
        }
    },
    {
      sequelize,
      modelName: 'Subcategory',
      tableName: 'Subcategories',
    }
);

return Subcategory;
};