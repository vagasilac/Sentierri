import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getUM = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/units-of-measure/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching UM!', error.stack);
    return null;
  }
}

export const addUM = async (UMData) => {
  console.log('addUM UMService UMData:', UMData);
  try {
    const response = await axios.post(`${API_BASE_URL}/units-of-measure`, UMData);
    return response.data;
  } catch (error) {
    console.error('Error adding UM!', error);
    return false;
  }
}

export const updateUM = async (UMData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/units-of-measure/${UMData.id}`, UMData);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error updating UM!', error);
    return false;
  }
}

export const getAllUMs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/units-of-measure`);
    console.log('response.data:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching UMs:', error.stack);
    return null;
  }
}

export const deleteUM = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/units-of-measure/${id}`);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error deleting UM!', error);
    return false;
  }
}