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
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();


// Create a new category
router.post('/', createCategory);

// Get all categories
router.get('/', getAllCategories);

// Get a single category by ID
router.get('/:id', getCategoryById);

// Update a category by ID
router.put('/:id', updateCategory);

// Delete a category by ID
router.delete('/:id', deleteCategory);

// Get all categories (protected route)
router.get('/', authMiddleware, getAllCategories);

module.exports = router;
