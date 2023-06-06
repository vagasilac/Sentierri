const express = require('express');
const router = express.Router();

const {
  getAllUnitsOfMeasure,
  createUnitofMeasure,
  getUnitOfMeasureById,
  updateUnitOfMeasure,
  deleteUnitOfMeasure,
} = require('../controllers/UMController');

router.get('/', getAllUnitsOfMeasure);
router.post('/', createUnitofMeasure);
router.get('/:id', getUnitOfMeasureById);
router.put('/:id', updateUnitOfMeasure);
router.delete('/:id', deleteUnitOfMeasure);

module.exports = router;