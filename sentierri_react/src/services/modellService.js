import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getModell = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modells/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching modell:', error);
    return null;
  }
}

export const addModell = async (modellData) => {
    console.log('modellData:', modellData);
    try {
      const response = await axios.post(`${API_BASE_URL}/modells/`, modellData);
      return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
      console.error('Error adding modell!', error);
      return false;
    }
}

export const updateModell = async (modellData) => {
  console.log('updateModell modellService modellData:', modellData);
  try {
    const response = await axios.put(`${API_BASE_URL}/modells/${modellData.id}`, modellData);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error updating modell!', error);
    return false;
  }
}

export const getAllModells = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modells`);
    return response.data;
  } catch (error) {

    console.error('Error fetching modells:', error.stack);
    return null;
  }
}

export const deleteModell = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/modells/${id}`);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error deleting modell!', error);
    return false;
  }
}

