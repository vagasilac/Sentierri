const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'L4c1 V4g4$123',
  database: 'sentierri'
});
client.connect();

const express = require('express');
const {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} = require('../controllers/subCategoryController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();


// Create a new subcategory
router.post('/', createSubCategory);

// Get all subcategories
router.get('/', getAllSubCategories);

// Get a single subcategory by ID
router.get('/:id', getSubCategoryById);

// Update a subcategory by ID
router.put('/:id', updateSubCategory);

// Delete a subcategory by ID
router.delete('/:id', deleteSubCategory);

// Get all subcategories (protected route)
router.get('/', authMiddleware, getAllSubCategories);

module.exports = router;
