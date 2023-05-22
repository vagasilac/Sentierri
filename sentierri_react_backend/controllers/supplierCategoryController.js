// Import the SupplierCategory model
const { SupplierCategory } = require('../models');

const createSupplierCategory = async (req, res) => {
  const { supplierId, categoryId } = req.params;
  console.log('supplierCategoryController.js: createSupplierCategory - start');
  console.log('supplierCategoryController.js: createSupplierCategory - supplierId', supplierId);
  console.log('supplierCategoryController.js: createSupplierCategory - categoryId', categoryId);
  try {
    const newSupplierCategory = await SupplierCategory.create({
      supplierId: supplierId,
      categoryId: categoryId
    });

    res.status(201).json({
      message: 'SupplierCategory relation created successfully.',
      supplierCategory: newSupplierCategory
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating supplierCategory relation.',
      error: error
    });
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
    await SupplierCategory.destroy({
      where: {
        supplierId: supplierId,
        categoryId: categoryId
      }
    });

    res.status(200).json({
      message: 'SupplierCategory relation deleted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting supplierCategory relation.',
      error: error
    });
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
