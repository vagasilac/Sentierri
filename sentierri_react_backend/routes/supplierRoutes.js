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
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} = require('../controllers/supplierController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();


// Create a new supplier
router.post('/', createSupplier);

// Get all suppliers
router.get('/', getAllSuppliers);

// Get a single supplier by ID
router.get('/:id', getSupplierById);

// Update a supplier by ID
router.put('/:id', updateSupplier);

// Delete a supplier by ID
router.delete('/:id', deleteSupplier);

// Get all suppliers (protected route)
router.get('/', authMiddleware, getAllSuppliers);

module.exports = router;
