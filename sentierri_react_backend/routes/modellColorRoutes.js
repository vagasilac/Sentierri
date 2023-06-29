const express = require('express');
const router = express.Router();

const {
  createModellColor,
  getAllModellColors,
  getModellColorsByModellId,
  getModellColorById,
  updateModellColor,
  deleteModellColor,
} = require('../controllers/modellColorController');

router.post('/', createModellColor);
router.get('/', getAllModellColors);
router.get('/:id', getModellColorById);
router.get('/:id', getModellColorsByModellId);
router.put('/:id', updateModellColor);
router.delete('/:id', deleteModellColor);

module.exports = router;