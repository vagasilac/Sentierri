const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Supplier = sequelize.define('Supplier', {
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
      telephone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street_address_1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      street_address_2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      county: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reg_com: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_person_firstname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_person_familyname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lead_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      swift: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      iban: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isAgent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Supplier',
      tableName: 'Suppliers',
    }
);

return Supplier;
};