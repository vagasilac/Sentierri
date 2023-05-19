// Import the SupplierCategory model
const { SupplierCategory } = require('../models');

// Create a new supplierCategory
const createSupplierCategory = async (req, res) => {
  try {
    const supplierCategoryData = req.body;
    console.log('Received supplierCategory data:', supplierCategoryData);
    const newSupplierCategory = await SupplierCategory.create(supplierCategoryData);
    res.status(201).json(newSupplierCategory);
  } catch (error) {
    console.log('Error creating supplierCategory!', error);
    res.status(400).json({ message: 'Error creating supplierCategory!', error });
  }
};

// Get all supplierCategories
const getAllSupplierCategories = async (req, res) => {
  try {
    const supplierCategories = await SupplierCategory.findAll();
    res.status(200).json(supplierCategories);
  } catch (error) {
    console.log('error stack', error.stack);
    console.error('error stack', error.stack);
    console.error('Error fetching supplierCategories:', error.message);
    res.status(400).json({ message: 'Error fetching supplierCategories', error: error.message });
  }
};

// Get a single supplierCategory by ID
const getSupplierCategoryById = async (req, res) => {
  try {
    const supplierCategory = await SupplierCategory.findByPk(req.params.id);
    if (!supplierCategory) {
      return res.status(404).json({ message: 'SupplierCategory not found' });
    }
    res.status(200).json(supplierCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching supplierCategory', error });
  }
};

// Update a supplierCategory by ID
const updateSupplierCategory = async (req, res) => {
  try {
    const [rowsUpdated] = await SupplierCategory.update(req.body, {
      where: { id: req.params.id },
    });

    if (!rowsUpdated) {
      return res.status(404).json({ message: 'SupplierCategory not found' });
    }

    const updatedSupplierCategory = await SupplierCategory.findByPk(req.params.id);
    res.status(200).json(updatedSupplierCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating supplierCategory', error });
  }
};

// Delete a supplierCategory by ID
const deleteSupplierCategory = async (req, res) => {
  try {
    const rowsDeleted = await SupplierCategory.destroy({ where: { id: req.params.id } });

    if (!rowsDeleted) {
      return res.status(404).json({ message: 'SupplierCategory not found' });
    }

    res.status(204).json({ message: 'SupplierCategory deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting supplierCategory', error });
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
