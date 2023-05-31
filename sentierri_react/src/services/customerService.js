import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getCustomer = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
};

export const addCustomer = async (customerData) => {
    console.log('customerData:', customerData);
    try {
      const response = await axios.post(`${API_BASE_URL}/customers`, customerData);
      return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
      console.error('Error adding customer!', error);
      return false;
    }
};

export const updateCustomer = async (customerData) => {
  console.log('updateCustomer customerService customerData:', customerData);
  try {
    const response = await axios.put(`${API_BASE_URL}/customers/${customerData.id}`, customerData);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error updating customer!', error);
    return false;
  }
};

export const getAllCustomers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers`);
    console.log('response.data:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error.stack);
    return null;
  }
};
