const { Shop } = require('../models');

const createShop = async (req, res) => {
  try {
    const shop = await Shop.create(req.body);
    return res.status(201).json({
      shop,
    });
  }
  catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getAllShops = async (req, res) => {
  console.log('getAllShops req.body:', req.body);
  try {
    const shops = await Shop.findAll();
    return res.status(200).json(shops);
  }
  catch (error) {
    res.status(400).json({ message: 'Error fetching shops', error });
  }
}

const getShopById = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findOne({
      where: { id: id }
    });
    if (shop) {
      return res.status(200).json({ shop });
    }
    return res.status(404).send('Shop with the specified ID does not exists');
  }
  catch (error) {
    return res.status(400).send(error.message);
  }
}

const updateShop = async (req, res) => {
  try {
    const [rowsUpdated] = await Shop.update(req.body, {
      where: { id: req.params.id }
    });
    if (rowsUpdated) {
      const updatedShop = await Shop.findOne({ where: { id: req.params.id } });
      return res.status(200).json({ shop: updatedShop });
    }
    return res.status(404).send('Shop with the specified ID does not exists');
  }
  catch (error) {
    res.status(500).send(error.message);
  }
}

const deleteShop = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Shop.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(204).send("Shop deleted");
    }
    throw new Error("Shop not found");
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop
};