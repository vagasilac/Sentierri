import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getModType = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modtypes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching modtype:', error);
    return null;
  }
}

export const addModType = async (modtypeData) => {
    console.log('modtypeData:', modtypeData);
    try {
      const response = await axios.post(`${API_BASE_URL}/modtypes/`, modtypeData);
      return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
      console.error('Error adding modtype!', error);
      return false;
    }
}

export const updateModType = async (modtypeData) => {
  console.log('updateModType modtypeService modtypeData:', modtypeData);
  try {
    const response = await axios.put(`${API_BASE_URL}/modtypes/${modtypeData.id}`, modtypeData);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error updating modtype!', error);
    return false;
  }
}

export const getAllModTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modtypes`);
    return response.data;
  } catch (error) {

    console.error('Error fetching modtypes:', error.stack);
    return null;
  }
}

export const deleteModType = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/modtypes/${id}`);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error deleting modtype!', error);
    return false;
  }
}