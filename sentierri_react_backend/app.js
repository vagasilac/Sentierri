const express = require('express');
const cors = require('cors');
const {Sequelize} = require('sequelize');
const { sequelize } = require('./models');
const materialRoutes = require('./routes/materialRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const supplierCategoryRoutes = require('./routes/supplierCategoryRoutes');
const modellColorRoutes = require('./routes/modellColorRoutes');
const modellSizeRoutes = require('./routes/modellSizeRoutes');
const supplierMaterialRoutes = require('./routes/supplierMaterialRoutes');
const agentRelationRoutes = require('./routes/agentRelationRoutes');
const customerRoutes = require('./routes/customerRoutes');
const shopRoutes = require('./routes/shopRoutes');
const colorRoutes = require('./routes/colorRoutes');
const sizeRoutes = require('./routes/sizeRoutes');
const modellRoutes = require('./routes/modellRoutes');
const unitOfMeasureRoutes = require('./routes/UMRoutes');
const passport = require('./middleware/passport');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// API routes
app.use('/api/materials', materialRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/suppliercategories', supplierCategoryRoutes);
app.use('/api/modell-colors', modellColorRoutes);
app.use('/api/modell-sizes', modellSizeRoutes);
app.use('/api/suppliermaterials', supplierMaterialRoutes)
app.use('/api/agentrelations', agentRelationRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/colors', colorRoutes);
app.use('/api/sizes', sizeRoutes);
app.use('/api/modells', modellRoutes);
app.use('/api/unitsOfMeasure', unitOfMeasureRoutes);
app.use('/api/uploads', uploadRoutes);

// Add routes for other entities (e.g., products, orders) as needed

// Example route for user login
const loginRoute = require('./routes/loginRoute');
app.use('/api/login', passport.authenticate('local', { session: false }), loginRoute);

// Import your models
const Material = require('./models/material')(sequelize);
const Category = require('./models/category')(sequelize);
const Subcategory = require('./models/subcategory')(sequelize);
const Supplier = require('./models/supplier')(sequelize);
const SupplierCategory = require('./models/suppliercategory')(sequelize);
const SupplierMaterial = require('./models/suppliermaterial')(sequelize);
const AgentRelation = require('./models/agentrelation')(sequelize);
const Customer = require('./models/customer')(sequelize);
const Shop = require('./models/shop')(sequelize);
const Color = require('./models/color')(sequelize);
const Modell = require('./models/modell')(sequelize);
const ModType = require('./models/modtype')(sequelize);
const Stage = require('./models/stage')(sequelize);
const UnitOfMeasure = require('./models/unitOfMeasure')(sequelize);

// Sync models with the database
sequelize
  .sync({ alter: true }) // Use "alter: true" to update the schema if it has changed, or "force: true" to drop and recreate tables (use with caution)
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
