import axios from 'axios';
import { API_BASE_URL } from '../config';

// getModellSize
export const getModellSize = async (modellId, sizeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modell-sizes/${modellId}/${sizeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching modellSize:', error);
    return null;
  }
}

// addModellSize
export const addModellSize = async (modellId, sizeId) => {
  console.log('modellSizeService addModellSize','modellId:', modellId, 'sizeId:', sizeId);
  try {
    const response = await axios.post(`${API_BASE_URL}/modell-sizes/${modellId}/${sizeId}`);
    return response.status === 201; // Return true if the status code is 201 (Created)
  } catch (error) {
    console.error('Error adding modellSize!', error);
    return false;
  }
}

// getAllModellSizes
export const getAllModellSizes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modell-sizes/`);
    console.log('response.data:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching modellSizes:', error.stack);
    return null;
  }
}

// removeModellSize
export const removeModellSize = async (modellId, sizeId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/modell-sizes/${modellId}/${sizeId}`);
    if (response.status !== 200) {
      throw new Error('Failed to delete modell size');
    }
    return response.data;
  } catch (error) {
    console.error('Error deleting modellSize!', error);
    return false;
  }
}

// getModellSizesByModellId
export const getModellSizesByModellId = async (modellId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modell-sizes/modell/${modellId}`);
    console.log('getModellSizesByModellId response.data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching modellSizes:', error);
    return null;
  }
}

// getModellSizesByColorId
export const getModellSizesByColorId = async (sizeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modell-sizes/${sizeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching modellSizes:', error);
    return null;
  }
}
