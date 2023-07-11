const { FinishedProduct } = require('../models');

const createFinishedProduct = async (req, res) => {
  const { modellId, colorId, sizeId } = req.params;
  try {
    const newFinishedProduct = await FinishedProduct.create({
      modellId: modellId,
      colorId: colorId,
      sizeId: sizeId
    });
    res.status(201).json({
      message: 'FinishedProduct created successfully.',
      finishedProduct: newFinishedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating finishedProduct.',
      error: error
    });
  }
}

const getFinishedProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const finishedProduct = await FinishedProduct.findOne({
      where: { id }
    });
    if (finishedProduct) {
      res.status(200).json(finishedProduct);
    } else {
      res.status(404).json({ message: 'FinishedProduct not found' });
    }
  }
  catch (error) {
    res.status(500).json({ message: 'Error retrieving finishedProduct' });
  }
}

const getFinishedProductsByModellId = async (req, res) => {
  const { id: modellId } = req.params;
  try {
    const finishedProducts = await FinishedProduct.findAll({
      where: { modellId }
    });
    if (finishedProducts) {
      res.status(200).json(finishedProducts);
    } else {
      res.status(404).json({ message: 'FinishedProducts not found' });
    }
  }
  catch (error) {
    res.status(500).json({ message: 'Error retrieving finishedProducts' });
  }
}

const getFinishedProductsByColorId = async (req, res) => {
  const { id: colorId } = req.params;
  try {
    const finishedProducts = await FinishedProduct.findAll({
      where: { colorId }
    });
    if (finishedProducts) {
      res.status(200).json(finishedProducts);
    } else {
      res.status(404).json({ message: 'FinishedProducts not found' });
    }
  }
  catch (error) {
    res.status(500).json({ message: 'Error retrieving finishedProducts' });
  }
}

const getFinishedProductsBySizeId = async (req, res) => {
  const { id: sizeId } = req.params;
  try {
    const finishedProducts = await FinishedProduct.findAll({
      where: { sizeId }
    });
    if (finishedProducts) {
      res.status(200).json(finishedProducts);
    } else {
      res.status(404).json({ message: 'FinishedProducts not found' });
    }
  }
  catch (error) {
    res.status(500).json({ message: 'Error retrieving finishedProducts' });
  }
}

const getAllFinishedProducts = async (req, res) => {
  try {
    const finishedProducts = await FinishedProduct.findAll();
    res.status(200).json(finishedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving finishedProducts' });
  }
}

const deleteFinishedProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await FinishedProduct.destroy({
      where: { id: id }
    });
    res.status(200).json({
      message: 'FinishedProduct deleted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting finishedProduct.',
      error: error
    });
  }
}

const updateFinishedProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const finishedProduct = await FinishedProduct.update(req.body, {
      where: { id }
    });
    if (finishedProduct[0] !== 0) {
      res.status(200).json({ message: 'FinishedProduct updated successfully' });
    } else {
      res.status(404).json({ message: 'FinishedProduct not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating finishedProduct' });
  }
}

module.exports = {
  createFinishedProduct,
  getAllFinishedProducts,
  getFinishedProductById,
  getFinishedProductsByModellId,
  getFinishedProductsByColorId,
  getFinishedProductsBySizeId,
  updateFinishedProduct,
  deleteFinishedProduct,
};