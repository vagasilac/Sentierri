const express = require('express');
const router = express.Router();

// Import your entity routes (e.g., materialRoutes, orderRoutes, etc.)
const materialRoutes = require('./materialRoutes');
const categoryRoutes = require('./categoryRoutes');
const subCategoryRoutes = require('./subCategoryRoutes');
const supplierRoutes = require('./supplierRoutes');
const supplierCategoryRoutes = require('./supplierCategoryRoutes');
const supplierMaterialRoutes = require('./supplierMaterialRoutes');
const agentRelationRoutes = require('./agentRelationRoutes');
const customerRoutes = require('./customerRoutes');
const shopRoutes = require('./shopRoutes');
const colorRoutes = require('./colorRoutes');
const UMRoutes = require('./UMRoutes');

// Import your file upload route
const fileUploadRoutes = require('./upload');

// Use your entity routes
router.use('/materials', materialRoutes);
router.use('/categories', categoryRoutes);
router.use('/subcategories', subCategoryRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/supplier-categories', supplierCategoryRoutes);
router.use('/supplier-materials', supplierMaterialRoutes);
router.use('/agentrelations', agentRelationRoutes);
router.use('/customers', customerRoutes);
router.use('/shops', shopRoutes);
router.use('/colors', colorRoutes);
router.use('/units-of-measure', UMRoutes);

// Use your file upload route
router.use('/upload', fileUploadRoutes);

// Add other entity routes here

module.exports = router;