const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Color = sequelize.define('Color', {
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
        display_color_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gradient: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Color',
        tableName: 'Colors',
    }
    );

    return Color;
};