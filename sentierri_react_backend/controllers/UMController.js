const { UnitOfMeasure } = require('../models');

const createUnitofMeasure = async (req, res) => {
  try {
    const unitOfMeasure = await UnitOfMeasure.create(req.body);
    res.status(201).json(unitOfMeasure);
  } catch (error) {
    console.error('Error creating unitOfMeasure:', error.message);
    res.status(400).json({ message: 'Error creating unitOfMeasure', error: error.message });
  }
}

const getAllUnitsOfMeasure = async (req, res) => {
  try {
    const unitsOfMeasure = await UnitOfMeasure.findAll();
    res.status(200).json(unitsOfMeasure);
  } catch (error) {
    console.error('Error fetching unitsOfMeasure:', error.message);
    res.status(400).json({ message: 'Error fetching unitsOfMeasure', error: error.message });
  }
}

const getUnitOfMeasureById = async (req, res) => {
  try {
    const unitOfMeasure = await UnitOfMeasure.findByPk(req.params.id);
    if (!unitOfMeasure) {
      return res.status(404).json({ message: 'UnitOfMeasure not found' });
    }
    res.status(200).json(unitOfMeasure);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching unitOfMeasure', error });
  }
}

const updateUnitOfMeasure = async (req, res) => {
  try {
    const [rowsUpdated] = await UnitOfMeasure.update(req.body, {
      where: { id: req.params.id },
    });
    if (!rowsUpdated) {
      return res.status(404).json({ message: 'UnitOfMeasure not found' });
    }
    const updatedUnitOfMeasure = await UnitOfMeasure.findByPk(req.params.id);
    res.status(200).json(updatedUnitOfMeasure);
  } catch (error) {
    res.status(400).json({ message: 'Error updating unitOfMeasure', error });
  }
}

const deleteUnitOfMeasure = async (req, res) => {
  try {
    const rowsDeleted = await UnitOfMeasure.destroy({ where: { id: req.params.id } });
    if (!rowsDeleted) {
      return res.status(404).json({ message: 'UnitOfMeasure not found' });
    }
    res.status(204).json({ message: 'UnitOfMeasure deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting unitOfMeasure', error });
  }
}

module.exports = {
  createUnitofMeasure,
  getAllUnitsOfMeasure,
  getUnitOfMeasureById,
  updateUnitOfMeasure,
  deleteUnitOfMeasure,
};