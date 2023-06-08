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
router.get('/', getAllSupplierMaterials);
router.get('/:supplierId', getSupplierMaterialsBySupplierId);
router.get('/:materialId', getSupplierMaterialsByMaterialId);
router.get('/:supplierId/:materialId', getSupplierMaterialById);
router.post('/:supplierId/:materialId', createSupplierMaterial);
router.put('/:supplierId/:materialId', updateSupplierMaterial);
router.delete('/:supplierId/:materialId', deleteSupplierMaterial);

module.exports = router;