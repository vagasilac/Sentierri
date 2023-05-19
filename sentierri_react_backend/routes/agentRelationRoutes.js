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
  createAgentRelation,
  removeAgentRelation,
  getAllAgentRelations,
  setSupplierAgentStatus,
} = require('../controllers/agentRelationsController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();


// Create a new agentRelation
router.post('/', createAgentRelation);

// Get all agentRelations
router.get('/', getAllAgentRelations);

// Delete an agentRelation
router.delete('/', removeAgentRelation);

// Set supplier's isAgent status
router.put('/', setSupplierAgentStatus);

module.exports = router;
