const { Model } = require('sequelize');

const createModel = async (req, res) => {
  try {
    const modelData = req.body;
    console.log('Received model data:', modelData);
    const newModel = await Model.create(modelData);
    res.status(201).json(newModel);
  } catch (error) {
    console.log('Error creating model!', error);
    res.status(400).json({ message: 'Error creating model!', error });
  }
}

const getAllModels = async (req, res) => {
  try {
    const models = await Model.findAll();
    res.status(200).json(models);
  } catch (error) {
    console.error('Error fetching models:', error.message);
    res.status(400).json({ message: 'Error fetching models', error: error.message });
  }
}

const getModelById = async (req, res) => {
  try {
    const model = await Model.findByPk(req.params.id);
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.status(200).json(model);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching model', error });
  }
}

const updateModel = async (req, res) => {
  try {
    const [rowsUpdated] = await Model.update(req.body, {
      where: { id: req.params.id },
    });
    if (!rowsUpdated) {
      return res.status(404).json({ message: 'Model not found' });
    }
    const updatedModel = await Model.findByPk(req.params.id);
    res.status(200).json(updatedModel);
  } catch (error) {
    res.status(400).json({ message: 'Error updating model', error });
  }
}

const deleteModel = async (req, res) => {
  try {
    const rowsDeleted = await Model.destroy({ where: { id: req.params.id } });
    if (!rowsDeleted) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.status(204).json({ message: 'Model deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting model', error });
  }
}

module.exports = {
  createModel,
  getAllModels,
  getModelById,
  updateModel,
  deleteModel,
};