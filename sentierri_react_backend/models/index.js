'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[process.env.USE_ENV_VARIABLE];
const db = {};
const Category = require('./category');
const Customer = require('./customer');
const Color = require('./color');
const Size = require('./size');
const Shop = require('./shop');
const Subcategory = require('./subcategory');
const Supplier = require('./supplier');
const Material = require('./material');
const Modell = require('./modell');
const ModType = require('./modtype');
const Stage = require('./stage');
const AgentRelations = require('./agentrelations');
const SupplierMaterial = require('./suppliermaterial');
const SupplierCategory = require('./suppliercategory');

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Category.hasMany(db.Subcategory, { foreignKey: 'parentCategoryId' });
db.Subcategory.belongsTo(db.Category, { foreignKey: 'parentCategoryId' });
db.Supplier.belongsToMany(db.Category, { through: 'SupplierCategory', as: 'categories', foreignKey: 'supplierId', otherKey: 'categoryId' });
db.Category.belongsToMany(db.Supplier, { through: 'SupplierCategory', as: 'suppliers', foreignKey: 'categoryId', otherKey: 'supplierId' });
db.Supplier.belongsToMany(db.Material, { through: 'SupplierMaterial', as: 'materials', foreignKey: 'supplierId', otherKey: 'materialId' });
db.Material.belongsToMany(db.Supplier, { through: 'SupplierMaterial', as: 'suppliers', foreignKey: 'materialId', otherKey: 'supplierId' });
db.Supplier.belongsToMany(db.Supplier, { through: 'AgentRelations', as: 'agents', foreignKey: 'agentId', otherKey: 'supplierId' });
db.Supplier.belongsToMany(db.Supplier, { through: 'AgentRelations', as: 'suppliers', foreignKey: 'supplierId', otherKey: 'agentId' });
db.Customer.hasMany(db.Shop, { foreignKey: 'parentCustomerId' });
db.Shop.belongsTo(db.Customer, { foreignKey: 'parentCustomerId' });
db.ModType.hasMany(db.Modell, { foreignKey: 'parentModTypeId' });
db.Modell.belongsTo(db.ModType, { foreignKey: 'parentModTypeId' });
db.Stage.hasMany(db.Modell, { foreignKey: 'parentStageId' });
db.Modell.belongsTo(db.Stage, { foreignKey: 'parentStageId' });
db.Modell.belongsToMany(db.Color, { through: 'ModellColor', as: 'colors', foreignKey: 'modellId', otherKey: 'colorId' });
db.Color.belongsToMany(db.Modell, { through: 'ModellColor', as: 'modells', foreignKey: 'colorId', otherKey: 'modellId' });
db.Modell.belongsToMany(db.Size, { through: 'ModellSize', as: 'sizes', foreignKey: 'modellId', otherKey: 'sizeId' });
db.Size.belongsToMany(db.Modell, { through: 'ModellSize', as: 'modells', foreignKey: 'sizeId', otherKey: 'modellId' });
db.Modell.hasMany(db.FinishedProduct, { foreignKey: 'modellId' });
db.FinishedProduct.belongsTo(db.Modell, { foreignKey: 'modellId' });
db.Color.hasMany(db.FinishedProduct, { foreignKey: 'colorId' });
db.FinishedProduct.belongsTo(db.Color, { foreignKey: 'colorId' });
db.Size.hasMany(db.FinishedProduct, { foreignKey: 'sizeId' });
db.FinishedProduct.belongsTo(db.Size, { foreignKey: 'sizeId' });

module.exports = db;
