const { ModType } = require('../models');

const createModType = async (req, res) => {
  try {
    const modTypeData = req.body;
    console.log('Received modType data:', modTypeData);
    const newModType = await ModType.create(modTypeData);
    res.status(201).json(newModType);
  } catch (error) {
    console.log('Error creating modType!', error);
    res.status(400).json({ message: 'Error creating modType!', error });
  }
}

const getAllModTypes = async (req, res) => {
  try {
    console.log('Fetching modTypes... in modTypeController.js getAllModTypes', ModType);
    const modTypes = await ModType.findAll();
    res.status(200).json(modTypes);
  } catch (error) {
    console.error('Error fetching modTypes:', error.message);
    res.status(400).json({ message: 'Error fetching modTypes', error: error.message });
  }
}

const getModTypeById = async (req, res) => {
  try {
    const modType = await ModType.findByPk(req.params.id);
    if (!modType) {
      return res.status(404).json({ message: 'ModType not found' });
    }
    res.status(200).json(modType);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching modType', error });
  }
}

const updateModType = async (req, res) => {
  try {
    const [rowsUpdated] = await ModType.update(req.body, {
      where: { id: req.params.id },
    });
    if (!rowsUpdated) {
      return res.status(404).json({ message: 'ModType not found' });
    }
    const updatedModType = await ModType.findByPk(req.params.id);
    res.status(200).json(updatedModType);
  } catch (error) {
    res.status(400).json({ message: 'Error updating modType', error });
  }
}

const deleteModType = async (req, res) => {
  try {
    const rowsDeleted = await ModType.destroy({ where: { id: req.params.id } });
    if (!rowsDeleted) {
      return res.status(404).json({ message: 'ModType not found' });
    }
    res.status(204).json({ message: 'ModType deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting modType', error });
  }
}

module.exports = {
  createModType,
  getAllModTypes,
  getModTypeById,
  updateModType,
  deleteModType,
}