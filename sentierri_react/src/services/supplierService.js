import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getSupplier = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/suppliers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching supplier:', error);
    return null;
  }
};

export const addSupplier = async (supplierData) => {
    console.log('supplierData:', supplierData);
    try {
      const response = await axios.post(`${API_BASE_URL}/suppliers`, supplierData);
      return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
      console.error('Error adding supplier!', error);
      return false;
    }
};

export const updateSupplier = async (supplierData) => {
  console.log('updateSupplier supplierService supplierData:', supplierData);
  try {
    const response = await axios.put(`${API_BASE_URL}/suppliers/${supplierData.id}`, supplierData);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error updating supplier!', error);
    return false;
  }
};

export const getAllSuppliers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/suppliers`);
    console.log('response.data:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching suppliers:', error.stack);
    return null;
  }
};