const express = require('express');
const router = express.Router();

const {
  createSupplierMaterial,
  getAllSupplierMaterials,
  getSupplierMaterialById,
  getSupplierMaterialsBySupplierId,
  getSupplierMaterialsByMaterialId,
  updateSupplierMaterial,
  deleteSupplierMaterial,
} = require('../controllers/supplierMaterialController');

console.log('supplierMaterialRoutes.js: before router.get()');
router.get('/supplier-material/', getAllSupplierMaterials);
router.get('/supplier-materials/supplier/:supplierId', getSupplierMaterialsBySupplierId);
router.get('/supplier-materials/material/:materialId', getSupplierMaterialsByMaterialId);
router.get('/supplier-material/:supplierId/:materialId', getSupplierMaterialById);
router.post('/supplier-material/:supplierId/:materialId', createSupplierMaterial);
router.put('/supplier-material/:supplierId/:materialId', updateSupplierMaterial);
router.delete('/supplier-material/:supplierId/:materialId', deleteSupplierMaterial);

module.exports = router;