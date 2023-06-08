const express = require('express');
const router = express.Router();

const {
  createSupplierCategory,
  getAllSupplierCategories,
  getSupplierCategoryById,
  updateSupplierCategory,
  deleteSupplierCategory,
} = require('../controllers/supplierCategoryController');

router.get('/', getAllSupplierCategories);
router.get('/:supplierId/:categoryId', getSupplierCategoryById);
router.post('/:supplierId/:categoryId', createSupplierCategory);
router.put('/:supplierId/:categoryId', updateSupplierCategory);
router.delete('/:supplierId/:categoryId', deleteSupplierCategory);

module.exports = router;