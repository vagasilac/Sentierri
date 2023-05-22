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


// Create a new supplierCategory
router.post('/', createSupplierCategory);

// Get all supplierCategories
router.get('/', getAllSupplierCategories);

// Get a single supplierCategory by ID
router.get('/:id', getSupplierCategoryById);

// Update a supplierCategory by ID
router.put('/:id', updateSupplierCategory);

// Delete a supplierCategory by supplierId and categoryId
router.delete('/:supplierId/:categoryId', deleteSupplierCategory);

// Get all supplierCategories (protected route)
router.get('/', authMiddleware, getAllSupplierCategories);

module.exports = router;
