const express = require('express');
const router = express.Router();

const {
  createStage,
  getAllStages,
  getStageById,
  updateStage,
  deleteStage,
} = require('../controllers/stageController');

router.post('/', createStage);
router.get('/', getAllStages);
router.get('/:id', getStageById);
router.put('/:id', updateStage);
router.delete('/:id', deleteStage);

module.exports = router;