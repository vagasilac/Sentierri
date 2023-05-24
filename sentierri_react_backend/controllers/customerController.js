const { Customer } = require('../models');

const createCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    console.log('Received customer data:', customerData);
    const newCustomer = await Customer.create(customerData);
    res.status(201).json(newCustomer);
  } catch (error) {
    console.log('Error creating customer!', error);
    res.status(400).json({ message: 'Error creating customer!', error });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error.message);
    res.status(400).json({ message: 'Error fetching customers', error: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching customer', error });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const [rowsUpdated] = await Customer.update(req.body, {
      where: { id: req.params.id },
    });
    if (!rowsUpdated) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    const updatedCustomer = await Customer.findByPk(req.params.id);
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: 'Error updating customer', error });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const rowsDeleted = await Customer.destroy({ where: { id: req.params.id } });
    if (!rowsDeleted) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(204).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting customer', error });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
