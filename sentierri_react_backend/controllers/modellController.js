const { Modell } = require('../models');

const createModell = async (req, res) => {
  try {
    const modellData = req.body;
    console.log('Received modell data:', modellData);
    const newModell = await Modell.create(modellData);
    res.status(201).json(newModell);
  } catch (error) {
    console.log('Error creating modell!', error);
    res.status(400).json({ message: 'Error creating modell!', error });
  }
}

const getAllModells = async (req, res) => {
  try {
    console.log('Fetching modells... in modellController.js getAllModells', Modell);
    const modells = await Modell.findAll();
    res.status(200).json(modells);
  } catch (error) {
    console.error('Error fetching modells:', error.message);
    res.status(400).json({ message: 'Error fetching modells', error: error.message });
  }
}

const getModellById = async (req, res) => {
  try {
    const modell = await Modell.findByPk(req.params.id);
    if (!modell) {
      return res.status(404).json({ message: 'Modell not found' });
    }
    res.status(200).json(modell);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching modell', error });
  }
}

const updateModell = async (req, res) => {
  try {
    const [rowsUpdated] = await Modell.update(req.body, {
      where: { id: req.params.id },
    });
    if (!rowsUpdated) {
      return res.status(404).json({ message: 'Modell not found' });
    }
    const updatedModell = await Modell.findByPk(req.params.id);
    res.status(200).json(updatedModell);
  } catch (error) {
    res.status(400).json({ message: 'Error updating modell', error });
  }
}

const deleteModell = async (req, res) => {
  try {
    const rowsDeleted = await Modell.destroy({ where: { id: req.params.id } });
    if (!rowsDeleted) {
      return res.status(404).json({ message: 'Modell not found' });
    }
    res.status(204).json({ message: 'Modell deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting modell', error });
  }
}

module.exports = {
  createModell,
  getAllModells,
  getModellById,
  updateModell,
  deleteModell,
}