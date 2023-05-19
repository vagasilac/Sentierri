const express = require('express');
const router = express.Router();

// Import your entity routes (e.g., materialRoutes, orderRoutes, etc.)
const materialRoutes = require('./materialRoutes');
const categoryRoutes = require('./categoryRoutes');
const subCategoryRoutes = require('./subCategoryRoutes');
const supplierRoutes = require('./supplierRoutes');
const supplierCategoryRoutes = require('./supplierCategoryRoutes');
const agentRelationRoutes = require('./agentRelationRoutes');

// Use your entity routes
router.use('/materials', materialRoutes);
router.use('/categories', categoryRoutes);
router.use('/subcategories', subCategoryRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/suppliercategories', supplierCategoryRoutes);
router.use('/agentrelations', agentRelationRoutes);

// Add other entity routes here

module.exports = router;