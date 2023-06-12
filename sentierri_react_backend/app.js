const express = require('express');
const cors = require('cors');
const {Sequelize} = require('sequelize');
const { sequelize } = require('./models');
const materialRoutes = require('./routes/materialRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const supplierCategoryRoutes = require('./routes/supplierCategoryRoutes');
const supplierMaterialRoutes = require('./routes/supplierMaterialRoutes');
const agentRelationRoutes = require('./routes/agentRelationRoutes');
const customerRoutes = require('./routes/customerRoutes');
const shopRoutes = require('./routes/shopRoutes');
const colorRoutes = require('./routes/colorRoutes');
const unitOfMeasureRoutes = require('./routes/UMRoutes');
const uploadRoutes = require('./routes/upload');
const passport = require('./middleware/passport');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// API routes
app.use('/api/upload', uploadRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/suppliercategories', supplierCategoryRoutes);
app.use('/api/suppliermaterials', supplierMaterialRoutes)
app.use('/api/agentrelations', agentRelationRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/colors', colorRoutes);
app.use('/api/unitsOfMeasure', unitOfMeasureRoutes);

// Add routes for other entities (e.g., products, orders) as needed

// Add your file upload route
app.use('/api/upload', require('./routes/upload'));


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
