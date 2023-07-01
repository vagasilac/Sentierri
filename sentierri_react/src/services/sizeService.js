import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getSize = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sizes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching size:', error);
    return null;
  }
}

export const addSize = async (sizeData) => {
    console.log('sizeData:', sizeData);
    try {
      const response = await axios.post(`${API_BASE_URL}/sizes`, sizeData);
      return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
      console.error('Error adding size!', error);
      return false;
    }
}

export const updateSize = async (sizeData) => {
  console.log('updateSize sizeService sizeData:', sizeData);
  try {
    const response = await axios.put(`${API_BASE_URL}/sizes/${sizeData.id}`, sizeData);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error updating size!', error);
    return false;
  }
}

export const getAllSizes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sizes`);
    console.log('response.data:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching sizes:', error.stack);
    return null;
  }
}

export const deleteSize = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/sizes/${id}`);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error deleting size!', error);
    return false;
  }
}