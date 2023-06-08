const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Material = sequelize.define('Material', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      material_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      material_group: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      material_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      material_category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      material_subcategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      supplier_color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roll_width: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      unit_of_measure: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price_per_unit: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lead_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Material',
    }
);

return Material;
};