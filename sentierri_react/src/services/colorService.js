import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getColor = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/colors/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching color:', error);
    return null;
  }
}

export const addColor = async (colorData) => {
    console.log('colorData:', colorData);
    try {
      const response = await axios.post(`${API_BASE_URL}/colors`, colorData);
      return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
      console.error('Error adding color!', error);
      return false;
    }
}

export const updateColor = async (colorData) => {
  console.log('updateColor colorService colorData:', colorData);
  try {
    const response = await axios.put(`${API_BASE_URL}/colors/${colorData.id}`, colorData);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error updating color!', error);
    return false;
  }
}

export const getAllColors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/colors`);
    console.log('response.data:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching colors:', error.stack);
    return null;
  }
}

export const deleteColor = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/colors/${id}`);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error deleting color!', error);
    return false;
  }
}

