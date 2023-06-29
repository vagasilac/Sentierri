const express = require('express');
const router = express.Router();

// Import your entity routes (e.g., materialRoutes, orderRoutes, etc.)
const materialRoutes = require('./materialRoutes');
const categoryRoutes = require('./categoryRoutes');
const subCategoryRoutes = require('./subCategoryRoutes');
const supplierRoutes = require('./supplierRoutes');
const supplierCategoryRoutes = require('./supplierCategoryRoutes');
const modellColorRoutes = require('./modellColorRoutes');
const supplierMaterialRoutes = require('./supplierMaterialRoutes');
const agentRelationRoutes = require('./agentRelationRoutes');
const customerRoutes = require('./customerRoutes');
const shopRoutes = require('./shopRoutes');
const colorRoutes = require('./colorRoutes');
const modellRoutes = require('./modellRoutes');
const modTypeRoutes = require('./modTypeRoutes');
const stageRoutes = require('./stageRoutes');
const UMRoutes = require('./UMRoutes');
const uploadRoutes = require('./uploadRoutes');

// Use your entity routes
router.use('/materials', materialRoutes);
router.use('/categories', categoryRoutes);
router.use('/subcategories', subCategoryRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/supplier-categories', supplierCategoryRoutes);
router.use('/modell-colors', modellColorRoutes);
router.use('/supplier-materials', supplierMaterialRoutes);
router.use('/agentrelations', agentRelationRoutes);
router.use('/customers', customerRoutes);
router.use('/shops', shopRoutes);
router.use('/colors', colorRoutes);
router.use('/modells', modellRoutes);
router.use('/modtypes', modTypeRoutes);
router.use('/stages', stageRoutes);
router.use('/units-of-measure', UMRoutes);
router.use('/uploads', uploadRoutes);

// Add other entity routes here

module.exports = router;