import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getCategory = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};

export const addCategory = async (categoryData) => {
    console.log('categoryData:', categoryData);
    try {
      const response = await axios.post(`${API_BASE_URL}/categories`, categoryData);
      return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
      console.error('Error adding category!', error);
      return false;
    }
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    console.log('response.data:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
};
  