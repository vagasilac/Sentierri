const express = require('express');
const router = express.Router();
const {
  createSize,
  getAllSizes,
  getSizeById,
  updateSize,
  deleteSize,
} = require('../controllers/sizeController');

router.post('/', createSize);
router.get('/', getAllSizes);
router.get('/:id', getSizeById);
router.put('/:id', updateSize);
router.delete('/:id', deleteSize);

module.exports = router;