import axios from 'axios';
import { API_BASE_URL } from '../config';

// Get raw material by id
export const getRawMaterial = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/materials/${id}`);
    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching raw material', error);
    return null;
  }
};

// Add raw material
export const addRawMaterial = async (rawMaterialData) => {
    console.log('rawMaterialData:', rawMaterialData);
    try {
      const response = await axios.post(`${API_BASE_URL}/materials`, rawMaterialData);
      return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
      console.error('Error adding raw material!!!!!!!!!!', error);
      return false;
    }
};

// Get all materials
export const getAllMaterials = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/materials`);
    // const response = await axios.get(API_BASE_URL); // Original
    return response.data;
  } catch (error) {
    console.error('Error fetching materials:', error);
    return null;
  }
};

// Update raw material
export const updateRawMaterial = async ( id, newFormValues ) => {
  try {
    console.log('id:', id, 'newFormValues:', newFormValues);
    const response = await axios.put(`${API_BASE_URL}/materials/${id}`, newFormValues);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error updating raw material', error);
    return false;
  }
};
  