import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getSubCategory = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subcategories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    return null;
  }
};

export const addSubCategory = async (subCategoryData) => {
    console.log('subCategoryData:', subCategoryData);
    try {
      const response = await axios.post(`${API_BASE_URL}/subcategories`, subCategoryData);
      return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
      console.error('Error adding subcategory!', error);
      return false;
    }
};

// updateSubCategory
export const updateSubCategory = async (id, subCategoryData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/subcategories/${id}`, subCategoryData);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error updating subcategory:', error);
    return false;
  }
};


// fetch all subcategories that belong to a category id
export const getAllSubCategories = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subcategories/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      return null;
    }
  }
}
