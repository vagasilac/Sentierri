const express = require('express');
const router = express.Router();
const {
  createColor,
  getAllColors,
  getColorById,
  updateColor,
  deleteColor,
} = require('../controllers/colorController');

router.post('/', createColor);
router.get('/', getAllColors);
router.get('/:id', getColorById);
router.put('/:id', updateColor);
router.delete('/:id', deleteColor);

module.exports = router;
