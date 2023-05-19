// Import the Subcategory model
const { Subcategory } = require('../models');

// Create a new subcategory
const createSubCategory = async (req, res) => {
  try {
    const subCategoryData = req.body;
    console.log('Received subcategory data:', subCategoryData);
    const newSubCategory = await Subcategory.create(subCategoryData);
    res.status(201).json(newSubCategory);
  } catch (error) {
    console.log('Error creating subcategory!', error);
    res.status(400).json({ message: 'Error creating subcategory!', error });
  }
};

// Get all subcategories
const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await Subcategory.findAll();
    res.status(200).json(subCategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error.stack);
    res.status(400).json({ message: 'Error fetching subcategories', error });
  }
};

// Get a single subcategory by ID
const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await Subcategory.findByPk(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching subcategory', error });
  }
};

// Update a subcategory by ID
const updateSubCategory = async (req, res) => {
  try {
    const [rowsUpdated] = await Subcategory.update(req.body, {
      where: { id: req.params.id },
    });

    if (!rowsUpdated) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const updatedSubCategory = await Subcategory.findByPk(req.params.id);
    res.status(200).json(updatedSubCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating subcategory', error });
  }
};

// Delete a subcategory by ID
const deleteSubCategory = async (req, res) => {
  try {
    const rowsDeleted = await db.Subcategory.destroy({ where: { id: req.params.id } });

    if (!rowsDeleted) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(204).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting subcategory', error });
  }
};

// Export the CRUD functions for use in routes
module.exports = {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
