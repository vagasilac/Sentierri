const { SupplierMaterial } = require('../models');

const createSupplierMaterial = async (req, res) => {
  const { supplierId, materialId } = req.params;
  console.log('supplierMaterialController.js: createSupplierMaterial - start');
  console.log('supplierMaterialController.js: createSupplierMaterial - supplierId', supplierId);
  console.log('supplierMaterialController.js: createSupplierMaterial - materialId', materialId);
  try {
    const newSupplierMaterial = await SupplierMaterial.create({
      supplierId: supplierId,
      materialId: materialId
    });
    console.log('supplierMaterialController.js: createSupplierMaterial - newSupplierMaterial', newSupplierMaterial);
    res.status(201).json({
      message: 'SupplierMaterial relation created successfully.',
      supplierMaterial: newSupplierMaterial
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating supplierMaterial relation.',
      error: error
    });
  }
}

const getSupplierMaterialById = async (req, res) => {
  const { supplierId, materialId } = req.params;
  try {
    const supplierMaterial = await SupplierMaterial.findOne({
      where: { supplierId, materialId }
    });
    if (supplierMaterial) {
      res.status(200).json(supplierMaterial);
    } else {
      res.status(404).json({ message: 'Supplier-material relation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving supplier-material relation' });
  }
}

const getSupplierMaterialsBySupplierId = async (req, res) => {
  const { supplierId } = req.params;
  try {
    const supplierMaterials = await SupplierMaterial.findAll({
      where: { supplierId }
    });
    if (supplierMaterials) {
      res.status(200).json(supplierMaterials);
    } else {
      res.status(404).json({ message: 'Supplier-material relations not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving supplier-material relations' });
  }
}

const getSupplierMaterialsByMaterialId = async (req, res) => {
  const { materialId } = req.params;
  try {
    const supplierMaterials = await SupplierMaterial.findAll({
      where: { materialId }
    });
    if (supplierMaterials) {
      res.status(200).json(supplierMaterials);
    } else {
      res.status(404).json({ message: 'Supplier-material relations not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving supplier-material relations' });
  }
}


const updateSupplierMaterial = async (req, res) => {
  const { supplierId, materialId } = req.params;
  try {
    const supplierMaterial = await SupplierMaterial.update(req.body, {
      where: { supplierId, materialId }
    });
    if (supplierMaterial[0] !== 0) {
      res.status(200).json({ message: 'Supplier-material relation updated successfully' });
    } else {
      res.status(404).json({ message: 'Supplier-material relation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating supplier-material relation' });
  }
}

const deleteSupplierMaterial = async (req, res) => {
  const { supplierId, materialId } = req.params;

  try {
    await SupplierMaterial.destroy({
      where: {
        supplierId: supplierId,
        materialId: materialId
      }
    });

    res.status(200).json({
      message: 'SupplierMaterial relation deleted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting supplierMaterial relation.',
      error: error
    });
  }
}

const getAllSupplierMaterials = async (req, res) => {
  try {
    const supplierMaterials = await SupplierMaterial.findAll();
    res.status(200).json(supplierMaterials);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving supplier-material relations' });
  }
}

module.exports = {
  createSupplierMaterial,
  getAllSupplierMaterials,
  getSupplierMaterialById,
  updateSupplierMaterial,
  deleteSupplierMaterial,
};