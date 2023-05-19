// Import the Supplier model
const { Supplier, Category } = require('../models');

// Create a new supplier
const createSupplier = async (req, res) => {
  try {
    const supplierData = req.body;
    console.log('Received supplier data:', supplierData);
    const newSupplier = await Supplier.create(supplierData);
    res.status(201).json(newSupplier);
  } catch (error) {
    console.log('Error creating supplier!', error);
    res.status(400).json({ message: 'Error creating supplier!', error });
  }
};

// Get all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    // const suppliers = await Supplier.findAll();
    const suppliers = await Supplier.findAll({
      include: [{
        model: Category,
        through: { attributes: [] },
        as: 'categories'
      }]
    });
    // console.log('supplierController getAllSuppliers suppliers', suppliers);
    res.status(200).json(suppliers);
  } catch (error) {
    console.log('error stack', error.stack);
    console.error('error stack', error.stack);
    console.error('Error fetching suppliers:', error.message);
    res.status(400).json({ message: 'Error fetching suppliers', error: error.message });
  }
};

// Get a single supplier by ID
const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching supplier', error });
  }
};

// Update a supplier by ID
const updateSupplier = async (req, res) => {
  try {
    const [rowsUpdated] = await Supplier.update(req.body, {
      where: { id: req.params.id },
    });

    if (!rowsUpdated) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const updatedSupplier = await Supplier.findByPk(req.params.id);
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: 'Error updating supplier', error });
  }
};

// Delete a supplier by ID
const deleteSupplier = async (req, res) => {
  try {
    const rowsDeleted = await Supplier.destroy({ where: { id: req.params.id } });

    if (!rowsDeleted) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(204).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting supplier', error });
  }
};

// Export the CRUD functions for use in routes
module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
