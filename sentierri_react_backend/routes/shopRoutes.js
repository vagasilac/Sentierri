const express = require('express');
const router = express.Router();
const {
  getAllShops,
  getShopById,
  createShop,
  updateShop,
  deleteShop
} = require('../controllers/shopController');

router.get('/', getAllShops);
router.get('/:id', getShopById);
router.post('/', createShop);
router.put('/:id', updateShop);
router.delete('/:id', deleteShop);

module.exports = router;