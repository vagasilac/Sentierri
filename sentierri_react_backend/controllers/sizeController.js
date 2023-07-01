const { Size } = require('../models');

const createSize = async (req, res) => {
  try {
    const sizeData = req.body;
    console.log('Received size data:', sizeData);
    const newSize = await Size.create(sizeData);
    res.status(201).json(newSize);
  } catch (error) {
    console.log('Error creating size!', error);
    res.status(400).json({ message: 'Error creating size!', error });
  }
}

const getAllSizes = async (req, res) => {
  try {
    const sizes = await Size.findAll();
    res.status(200).json(sizes);
  } catch (error) {
    console.error('Error fetching sizes:', error.message);
    res.status(400).json({ message: 'Error fetching sizes', error: error.message });
  }
}

const getSizeById = async (req, res) => {
  try {
    const size = await Size.findByPk(req.params.id);
    if (!size) {
      return res.status(404).json({ message: 'Size not found' });
    }
    res.status(200).json(size);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching size', error });
  }
}

const updateSize = async (req, res) => {
  try {
    const [rowsUpdated] = await Size.update(req.body, {
      where: { id: req.params.id },
    });
    if (!rowsUpdated) {
      return res.status(404).json({ message: 'Size not found' });
    }
    const updatedSize = await Size.findByPk(req.params.id);
    res.status(200).json(updatedSize);
  } catch (error) {
    res.status(400).json({ message: 'Error updating size', error });
  }
}

const deleteSize = async (req, res) => {
  try {
    const rowsDeleted = await Size.destroy({ where: { id: req.params.id } });
    if (!rowsDeleted) {
      return res.status(404).json({ message: 'Size not found' });
    }
    res.status(204).json({ message: 'Size deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting size', error });
  }
}

module.exports = {
  createSize,
  getAllSizes,
  getSizeById,
  updateSize,
  deleteSize,
};