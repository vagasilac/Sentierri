const { Sequelize, sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const AgentRelations = sequelize.define('AgentRelations',{
      agentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Supplier',
          key: 'id',},
    },
      supplierId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Supplier',
          key: 'id',},
      },},
    {
      sequelize,
      modelName: 'AgentRelations',
      tableName: 'AgentRelations',
    }
);

return AgentRelations;
};