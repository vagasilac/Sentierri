import axios from 'axios';
import { API_BASE_URL } from '../config';

// getModellColor
export const getModellColor = async (modellId, colorId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modellcolors/${modellId}/${colorId}`);
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
    const response = await axios.post(`${API_BASE_URL}/modellcolors/${modellId}/${colorId}`);
    return response.status === 201; // Return true if the status code is 201 (Created)
  } catch (error) {
    console.error('Error adding modellColor!', error);
    return false;
  }
}

// getAllModellColors
export const getAllModellColors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modellcolors`);
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
    const response = await axios.delete(`${API_BASE_URL}/modellcolors/${modellId}/${colorId}`);
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
    console.log('getModellColorsByModellId modellId:', modellId, 'API_BASE_URL:', API_BASE_URL, 'API_BASE_URL + /modellcolors/:modellId:', API_BASE_URL + '/modellcolors/:modellId');
    const response = await axios.get(`${API_BASE_URL}/modellcolors/${modellId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching modellColors:', error);
    return null;
  }
}

// getModellColorsByColorId
export const getModellColorsByColorId = async (colorId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modellcolors/${colorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching modellColors:', error);
    return null;
  }
}
