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
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
  deleteMaterialLabelUrl,
} = require('../controllers/materialController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();


// Create a new material
router.post('/', createMaterial);

// Get all materials
router.get('/', getAllMaterials);

// Get a single material by ID
router.get('/:id', getMaterialById);

// Update a material by ID
router.put('/:id', updateMaterial);

// Update a material by ID (delete label url)
router.put('/:id/delete-label/:url', deleteMaterialLabelUrl);

// Delete a material by ID
router.delete('/:id', deleteMaterial);

// Get all materials (protected route)
router.get('/', authMiddleware, getAllMaterials);

module.exports = router;
