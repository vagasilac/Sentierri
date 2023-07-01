const express = require('express');
const router = express.Router();

const {
  createModellSize,
  getAllModellSizes,
  getModellSizesByModellId,
  getModellSizeById,
  updateModellSize,
  deleteModellSize,
} = require('../controllers/modellSizeController');

router.post('/', createModellSize);
router.get('/', getAllModellSizes);
router.get('/modell/:id', getModellSizesByModellId);
router.get('/:id', getModellSizeById);
router.put('/:id', updateModellSize);
router.delete('/:id', deleteModellSize);

module.exports = router;