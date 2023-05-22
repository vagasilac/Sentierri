import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getSupplierCategory = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/supplierCategories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching supplierCategory:', error);
    return null;
  }
};

export const addSupplierCategory = async (supplierId, categoryId) => {
    console.log('supplierCategoryService addSupplierCategory','supplierId:', supplierId, 'categoryId:', categoryId);
    try {
      const response = await axios.post(`${API_BASE_URL}/supplierCategories`, {supplierId, categoryId});
      return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
      console.error('Error adding supplierCategory!', error);
      return false;
    }
};

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

export const removeSupplierCategory = async (supplierId, categoryId) => {
  const response = await fetch(`/api/supplierCategories/${supplierId}/${categoryId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete supplier category');
  }

  return await response.json();
};
