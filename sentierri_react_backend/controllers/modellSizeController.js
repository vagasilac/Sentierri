const { ModellSize } = require('../models');

const createModellSize = async (req, res) => {
  const { modellId, sizeId } = req.params;
  console.log('modellSizeController.js: createModellSize - start');
  console.log('modellSizeController.js: createModellSize - modellId', modellId);
  console.log('modellSizeController.js: createModellSize - sizeId', sizeId);
  try {
    const newModellSize = await ModellSize.create({
      modellId: modellId,
      sizeId: sizeId
    });
    console.log('modellSizeController.js: createModellSize - newModellSize', newModellSize);
    res.status(201).json({
      message: 'ModellSize relation created successfully.',
      modellSize: newModellSize
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating modellSize relation.',
      error: error
    });
  }
}

const getModellSizeById = async (req, res) => {
  const { modellId, sizeId } = req.params;
  try {
    const modellSize = await ModellSize.findOne({
      where: { modellId, sizeId }
    });
    if (modellSize) {
      res.status(200).json(modellSize);
    } else {
      res.status(404).json({ message: 'Modell-size relation not found' });
    }
  }
  catch (error) {
    res.status(500).json({ message: 'Error retrieving modell-size relation' });
  }
}

const getModellSizesByModellId = async (req, res) => {
  const { id: modellId } = req.params;
  try {
    const modellSizes = await ModellSize.findAll({
      where: { modellId }
    });
    if (modellSizes) {
      res.status(200).json(modellSizes);
    } else {
      res.status(404).json({ message: 'Modell-size relations not found' });
    }
  }
  catch (error) {
    res.status(500).json({ message: 'Error retrieving modell-size relations' });
  }
}


const updateModellSize = async (req, res) => {
  const { modellId, sizeId } = req.params;
  try {
    const modellSize = await ModellSize.update(req.body, {
      where: { modellId, sizeId }
    });
    if (modellSize[0] !== 0) {
      res.status(200).json({ message: 'Modell-size relation updated successfully' });
    } else {
      res.status(404).json({ message: 'Modell-size relation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating modell-size relation' });
  }
}

const deleteModellSize = async (req, res) => {
  const { modellId, sizeId } = req.params;

  try {
    await ModellSize.destroy({
      where: {
        modellId: modellId,
        sizeId: sizeId
      }
    });

    res.status(200).json({
      message: 'ModellSize relation deleted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting modellSize relation.',
      error: error
    });
  }
}

const getAllModellSizes = async (req, res) => {
  try {
    const modellSizes = await ModellSize.findAll();
    res.status(200).json(modellSizes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving modell-size relations' });
  }
}

// Export the CRUD functions for use in routes
module.exports = {
  createModellSize,
  getAllModellSizes,
  getModellSizeById,
  getModellSizesByModellId,
  updateModellSize,
  deleteModellSize,
};