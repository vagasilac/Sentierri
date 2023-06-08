const { Sequelize, sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SupplierMaterial = sequelize.define('SupplierMaterial',{
    supplierId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Supplier',
        key: 'id',},
  },
    materialId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Material',
        key: 'id',},
    },},
  {
    sequelize,
    modelName: 'SupplierMaterial',
    tableName: 'SupplierMaterial',
  }
);

return SupplierMaterial;
};
