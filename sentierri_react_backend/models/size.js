const { Sequelize, sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Size = sequelize.define('Size', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        size_ro: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size_eu: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Size',
        tableName: 'Sizes',
    }
    );

    return Size;
}