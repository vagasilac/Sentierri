const express = require('express');
const router = express.Router();

const {
  createFinishedProduct,
  getAllFinishedProducts,
  getFinishedProductsByModellId,
  getFinishedProductsByColorId,
  getFinishedProductsBySizeId,
  getFinishedProductById,
  updateFinishedProduct,
  deleteFinishedProduct,
} = require('../controllers/finishedProductController');

router.post('/', createFinishedProduct);
router.get('/', getAllFinishedProducts);
router.get('/modell/:id', getFinishedProductsByModellId);
router.get('/color/:id', getFinishedProductsByColorId);
router.get('/size/:id', getFinishedProductsBySizeId);
router.get('/:id', getFinishedProductById);
router.put('/:id', updateFinishedProduct);
router.delete('/:id', deleteFinishedProduct);

module.exports = router;