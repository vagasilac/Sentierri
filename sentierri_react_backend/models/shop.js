const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Shop = sequelize.define('Shop', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parentCustomerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Customer,
              key: 'id',
            },
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
    },
    {
        sequelize,
        modelName: 'Shop',
        tableName: 'Shops',
    }
    );

    return Shop;
};