const { Color } = require('../models');

const createColor = async (req, res) => {
  try {
    const colorData = req.body;
    console.log('Received color data:', colorData);
    const newColor = await Color.create(colorData);
    res.status(201).json(newColor);
  } catch (error) {
    console.log('Error creating color!', error);
    res.status(400).json({ message: 'Error creating color!', error });
  }
}

const getAllColors = async (req, res) => {
  try {
    const colors = await Color.findAll();
    res.status(200).json(colors);
  } catch (error) {
    console.error('Error fetching colors:', error.message);
    res.status(400).json({ message: 'Error fetching colors', error: error.message });
  }
}

const getColorById = async (req, res) => {
  try {
    const color = await Color.findByPk(req.params.id);
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.status(200).json(color);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching color', error });
  }
}

const updateColor = async (req, res) => {
  try {
    const [rowsUpdated] = await Color.update(req.body, {
      where: { id: req.params.id },
    });
    if (!rowsUpdated) {
      return res.status(404).json({ message: 'Color not found' });
    }
    const updatedColor = await Color.findByPk(req.params.id);
    res.status(200).json(updatedColor);
  } catch (error) {
    res.status(400).json({ message: 'Error updating color', error });
  }
}

const deleteColor = async (req, res) => {
  try {
    const rowsDeleted = await Color.destroy({ where: { id: req.params.id } });
    if (!rowsDeleted) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.status(204).json({ message: 'Color deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting color', error });
  }
}

module.exports = {
  createColor,
  getAllColors,
  getColorById,
  updateColor,
  deleteColor,
};