const { Sequelize, sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SupplierCategory = sequelize.define('SupplierCategory',{
      supplierId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Supplier',
          key: 'id',},
    },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Category',
          key: 'id',},
      },},
    {
      sequelize,
      modelName: 'SupplierCategory',
      tableName: 'SupplierCategory',
    }
);

return SupplierCategory;
};