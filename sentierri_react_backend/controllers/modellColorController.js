const { ModellColor } = require('../models');

const createModellColor = async (req, res) => {
  const { modellId, colorId } = req.params;
  console.log('modellColorController.js: createModellColor - start');
  console.log('modellColorController.js: createModellColor - modellId', modellId);
  console.log('modellColorController.js: createModellColor - colorId', colorId);
  try {
    const newModellColor = await ModellColor.create({
      modellId: modellId,
      colorId: colorId
    });
    console.log('modellColorController.js: createModellColor - newModellColor', newModellColor);
    res.status(201).json({
      message: 'ModellColor relation created successfully.',
      modellColor: newModellColor
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating modellColor relation.',
      error: error
    });
  }
}

const getModellColorById = async (req, res) => {
  const { modellId, colorId } = req.params;
  try {
    const modellColor = await ModellColor.findOne({
      where: { modellId, colorId }
    });
    if (modellColor) {
      res.status(200).json(modellColor);
    } else {
      res.status(404).json({ message: 'Modell-color relation not found' });
    }
  }
  catch (error) {
    res.status(500).json({ message: 'Error retrieving modell-color relation' });
  }
}

const getModellColorsByModellId = async (req, res) => {
  const { id: modellId } = req.params;
  try {
    const modellColors = await ModellColor.findAll({
      where: { modellId }
    });
    console.log('modellColorController.js: getModellColorsByModellId - modellColors', modellColors);
    if (modellColors) {
      res.status(200).json(modellColors);
    } else {
      res.status(404).json({ message: 'Modell-color relations not found' });
    }
  }
  catch (error) {
    res.status(500).json({ message: 'Error retrieving modell-color relations' });
  }
}


const updateModellColor = async (req, res) => {
  const { modellId, colorId } = req.params;
  try {
    const modellColor = await ModellColor.update(req.body, {
      where: { modellId, colorId }
    });
    if (modellColor[0] !== 0) {
      res.status(200).json({ message: 'Modell-color relation updated successfully' });
    } else {
      res.status(404).json({ message: 'Modell-color relation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating modell-color relation' });
  }
}

const deleteModellColor = async (req, res) => {
  const { modellId, colorId } = req.params;

  try {
    await ModellColor.destroy({
      where: {
        modellId: modellId,
        colorId: colorId
      }
    });

    res.status(200).json({
      message: 'ModellColor relation deleted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting modellColor relation.',
      error: error
    });
  }
}

const getAllModellColors = async (req, res) => {
  try {
    const modellColors = await ModellColor.findAll();
    res.status(200).json(modellColors);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving modell-color relations' });
  }
}

// Export the CRUD functions for use in routes
module.exports = {
  createModellColor,
  getAllModellColors,
  getModellColorById,
  getModellColorsByModellId,
  updateModellColor,
  deleteModellColor,
};


