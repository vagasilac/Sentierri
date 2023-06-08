const { Client } = require('pg');
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
router.post('/supplier-category/:supplierId/:categoryId', createSupplierCategory);
router.get('/supplier-category/', getAllSupplierCategories);
router.get('/supplier-category/:supplierId/:categoryId', getSupplierCategoryById);
router.get('/supplier-category/:supplierId/:categoryId', getSupplierCategoryById);
router.put('/supplier-category/:supplierId/:categoryId', updateSupplierCategory);
router.delete('/supplier-category/:supplierId/:categoryId', deleteSupplierCategory);

module.exports = router;
