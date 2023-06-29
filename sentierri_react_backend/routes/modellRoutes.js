const express = require('express');
const router = express.Router();
const {
  createModell,
  getAllModells,
  getModellById,
  updateModell,
  deleteModell,
} = require('../controllers/modellController');

router.post('/', createModell);
router.get('/', getAllModells);
router.get('/:id', getModellById);
router.put('/:id', updateModell);
router.delete('/:id', deleteModell);

module.exports = router;