const { Stage } = require('../models');

const createStage = async (req, res) => {
  try {
    const stageData = req.body;
    console.log('Received stage data:', stageData);
    const newStage = await Stage.create(stageData);
    res.status(201).json(newStage);
  } catch (error) {
    console.log('Error creating stage!', error);
    res.status(400).json({ message: 'Error creating stage!', error });
  }
}

const getAllStages = async (req, res) => {
  try {
    console.log('Fetching stages... in stageController.js getAllStages', Stage);
    const stages = await Stage.findAll();
    res.status(200).json(stages);
  } catch (error) {
    console.error('Error fetching stages:', error.message);
    res.status(400).json({ message: 'Error fetching stages', error: error.message });
  }
}

const getStageById = async (req, res) => {
  try {
    const stage = await Stage.findByPk(req.params.id);
    if (!stage) {
      return res.status(404).json({ message: 'Stage not found' });
    }
    res.status(200).json(stage);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching stage', error });
  }
}

const updateStage = async (req, res) => {
  try {
    const [rowsUpdated] = await Stage.update(req.body, {
      where: { id: req.params.id },
    });
    if (!rowsUpdated) {
      return res.status(404).json({ message: 'Stage not found' });
    }
    const updatedStage = await Stage.findByPk(req.params.id);
    res.status(200).json(updatedStage);
  } catch (error) {
    res.status(400).json({ message: 'Error updating stage', error });
  }
}

const deleteStage = async (req, res) => {
  try {
    const rowsDeleted = await Stage.destroy({ where: { id: req.params.id } });
    if (!rowsDeleted) {
      return res.status(404).json({ message: 'Stage not found' });
    }
    res.status(204).json({ message: 'Stage deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting stage', error });
  }
}

module.exports = {
  createStage,
  getAllStages,
  getStageById,
  updateStage,
  deleteStage,
}