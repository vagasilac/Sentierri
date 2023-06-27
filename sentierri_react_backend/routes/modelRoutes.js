const express = require('express');
const router = express.Router();
const {
  createModel,
  getAllModels,
  getModelById,
  updateModel,
  deleteModel,
} = require('../controllers/modelController');

router.post('/', createModel);
router.get('/', getAllModels);
router.get('/:id', getModelById);
router.put('/:id', updateModel);
router.delete('/:id', deleteModel);

module.exports = router;