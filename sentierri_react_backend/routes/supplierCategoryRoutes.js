const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'L4c1 V4g4$123',
  database: 'sentierri'
});
client.connect();

const express = require('express');
const {
  createSupplierCategory,
  getAllSupplierCategories,
  getSupplierCategoryById,
  updateSupplierCategory,
  deleteSupplierCategory,
} = require('../controllers/supplierCategoryController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

console.log('supplierCategoryRoutes.js: router.get(/) - start');
// Create a new supplierCategory
router.post('/:supplierId/:categoryId', createSupplierCategory);

// Get all supplierCategories
router.get('/:supplierId/:categoryId', getSupplierCategoryById);

// Get a single supplierCategory by ID
router.get('/:supplierId/:categoryId', getSupplierCategoryById);

// Update a supplierCategory by ID
router.put('/:supplierId/:categoryId', updateSupplierCategory);

// Delete a supplierCategory by supplierId and categoryId
router.delete('/:supplierId/:categoryId', deleteSupplierCategory);

// Get all supplierCategories (protected route)
// router.get('/', authMiddleware, getAllSupplierCategories);

module.exports = router;
