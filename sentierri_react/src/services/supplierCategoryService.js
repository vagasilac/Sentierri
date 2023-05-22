import axios from 'axios';
import { API_BASE_URL } from '../config';

// getSupplierCategory
export const getSupplierCategory = async (supplierId, categoryId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/supplierCategories/${supplierId}/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching supplierCategory:', error);
    return null;
  }
};

// addSupplierCategory
export const addSupplierCategory = async (supplierId, categoryId) => {
  console.log('supplierCategoryService addSupplierCategory','supplierId:', supplierId, 'categoryId:', categoryId);
  try {
    const response = await axios.post(`${API_BASE_URL}/supplierCategories/${supplierId}/${categoryId}`);
    return response.status === 201; // Return true if the status code is 201 (Created)
  } catch (error) {
    console.error('Error adding supplierCategory!', error);
    return false;
  }
};

// getAllSupplierCategories
export const getAllSupplierCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/supplierCategories`);
    console.log('response.data:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching supplierCategories:', error.stack);
    return null;
  }
};

// removeSupplierCategory
export const removeSupplierCategory = async (supplierId, categoryId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/supplierCategories/${supplierId}/${categoryId}`);
    if (response.status !== 200) {
      throw new Error('Failed to delete supplier category');
    }
    return response.data;
  } catch (error) {
    console.error('Error deleting supplierCategory!', error);
    return false;
  }
};
