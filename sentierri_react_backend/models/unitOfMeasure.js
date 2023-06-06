const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UnitOfMeasure = sequelize.define('UnitOfMeasure', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_en: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name_ro: {
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
        modelName: 'UnitOfMeasure',
        tableName: 'UnitsOfMeasure',
    }
    );

    return UnitOfMeasure;
};