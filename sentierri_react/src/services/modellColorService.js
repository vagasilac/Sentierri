import axios from 'axios';
import { API_BASE_URL } from '../config';

// getModellColor
export const getModellColor = async (modellId, colorId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modell-colors/${modellId}/${colorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching modellColor:', error);
    return null;
  }
}

// addModellColor
export const addModellColor = async (modellId, colorId) => {
  console.log('modellColorService addModellColor','modellId:', modellId, 'colorId:', colorId);
  try {
    const response = await axios.post(`${API_BASE_URL}/modell-colors/${modellId}/${colorId}`);
    return response.status === 201; // Return true if the status code is 201 (Created)
  } catch (error) {
    console.error('Error adding modellColor!', error);
    return false;
  }
}

// getAllModellColors
export const getAllModellColors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modell-colors/`);
    console.log('response.data:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching modellColors:', error.stack);
    return null;
  }
}

// removeModellColor
export const removeModellColor = async (modellId, colorId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/modell-colors/${modellId}/${colorId}`);
    if (response.status !== 200) {
      throw new Error('Failed to delete modell color');
    }
    return response.data;
  } catch (error) {
    console.error('Error deleting modellColor!', error);
    return false;
  }
}

// getModellColorsByModellId
export const getModellColorsByModellId = async (modellId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modell-colors/modell/${modellId}`);
    console.log('getModellColorsByModellId response.data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching modellColors:', error);
    return null;
  }
}

// getModellColorsByColorId
export const getModellColorsByColorId = async (colorId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modell-colors/${colorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching modellColors:', error);
    return null;
  }
}
