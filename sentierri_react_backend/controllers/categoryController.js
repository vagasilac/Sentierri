// Import the Category model
const { Category } = require('../models');

// Create a new category
const createCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    console.log('Received category data:', categoryData);
    const newCategory = await Category.create(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    console.log('Error creating category!', error);
    res.status(400).json({ message: 'Error creating category!', error });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error.stack);
    res.status(400).json({ message: 'Error fetching categories', error });
  }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching category', error });
  }
};

// Update a category by ID
const updateCategory = async (req, res) => {
  try {
    const [rowsUpdated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (!rowsUpdated) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  try {
    const rowsDeleted = await Category.destroy({ where: { id: req.params.id } });

    if (!rowsDeleted) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(204).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting category', error });
  }
};

// Export the CRUD functions for use in routes
module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
