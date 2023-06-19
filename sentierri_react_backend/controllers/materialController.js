// Import the Material model
const {Material} = require('../models');

// Create a new material
const createMaterial = async (req, res) => {
    try {
    const materialData = req.body;
    console.log('Received material data:', materialData);
    const newMaterial = await Material.create(materialData);
    res.status(201).json(newMaterial);
    console.log('Created material:', newMaterial);
  } catch (error) {
    console.log('Error creating material!!!', error);
    res.status(400).json({ message: 'Error creating material!!!', error });
  }
};

// Get all materials
const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.findAll();
    res.status(200).json(materials);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching materials', error });
  }
};

// Get a single material by ID
const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findByPk(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching material', error });
  }
};

// Update a material by ID
const updateMaterial = async (req, res) => {
  try {
    const [rowsUpdated] = await Material.update(req.body, {
      where: { id: req.params.id },
    });

    if (!rowsUpdated) {
      return res.status(404).json({ message: 'Material not found' });
    }

    const updatedMaterial = await Material.findByPk(req.params.id);
    res.status(200).json(updatedMaterial);
  } catch (error) {
    res.status(400).json({ message: 'Error updating material', error });
  }
};

// Delete a material by ID
const deleteMaterial = async (req, res) => {
  try {
    const rowsDeleted = await Material.destroy({ where: { id: req.params.id } });

    if (!rowsDeleted) {
      return res.status(404).json({ message: 'Material not found' });
    }

    res.status(204).json({ message: 'Material deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting material', error });
  }
};

// Export the CRUD functions for use in routes
module.exports = {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
};
