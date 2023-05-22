// Import the SupplierCategory model
const { SupplierCategory } = require('../models');

const createSupplierCategory = async (req, res) => {
  const { supplierId, categoryId } = req.body;
  try {
    const supplierCategory = await SupplierCategory.create({ supplierId, categoryId });
    res.status(201).json(supplierCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating supplier-category relation' });
  }
};

const getSupplierCategoryById = async (req, res) => {
  const { supplierId, categoryId } = req.params;
  try {
    const supplierCategory = await SupplierCategory.findOne({
      where: { supplierId, categoryId }
    });
    if (supplierCategory) {
      res.status(200).json(supplierCategory);
    } else {
      res.status(404).json({ message: 'Supplier-category relation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving supplier-category relation' });
  }
};

const updateSupplierCategory = async (req, res) => {
  const { supplierId, categoryId } = req.params;
  try {
    const supplierCategory = await SupplierCategory.update(req.body, {
      where: { supplierId, categoryId }
    });
    if (supplierCategory[0] !== 0) {
      res.status(200).json({ message: 'Supplier-category relation updated successfully' });
    } else {
      res.status(404).json({ message: 'Supplier-category relation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating supplier-category relation' });
  }
};

const deleteSupplierCategory = async (req, res) => {
  const { supplierId, categoryId } = req.params;
  try {
    const deletedRows = await SupplierCategory.destroy({
      where: { supplierId, categoryId }
    });
    if (deletedRows !== 0) {
      res.status(200).json({ message: 'Supplier-category relation deleted successfully' });
    } else {
      res.status(404).json({ message: 'Supplier-category relation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting supplier-category relation' });
  }
};

const getAllSupplierCategories = async (req, res) => {
  try {
    const supplierCategories = await SupplierCategory.findAll();
    res.status(200).json(supplierCategories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving supplier-category relations' });
  }
};


// Export the CRUD functions for use in routes
module.exports = {
  createSupplierCategory,
  getAllSupplierCategories,
  getSupplierCategoryById,
  updateSupplierCategory,
  deleteSupplierCategory,
};
