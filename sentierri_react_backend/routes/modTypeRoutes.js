const express = require('express');
const router = express.Router();
const {
  createModType,
  getAllModTypes,
  getModTypeById,
  updateModType,
  deleteModType,
} = require('../controllers/modTypeController');

router.post('/', createModType);
router.get('/', getAllModTypes);
router.get('/:id', getModTypeById);
router.put('/:id', updateModType);
router.delete('/:id', deleteModType);

module.exports = router;