import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getStage = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stages/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stage:', error);
    return null;
  }
}

export const addStage = async (stageData) => {
    console.log('stageData:', stageData);
    try {
      const response = await axios.post(`${API_BASE_URL}/stages/`, stageData);
      return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
      console.error('Error adding stage!', error);
      return false;
    }
}

export const updateStage = async (stageData) => {
  console.log('updateStage stageService stageData:', stageData);
  try {
    const response = await axios.put(`${API_BASE_URL}/stages/${stageData.id}`, stageData);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error updating stage!', error);
    return false;
  }
}

export const getAllStages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stages`);
    return response.data;
  } catch (error) {

    console.error('Error fetching stages:', error.stack);
    return null;
  }
}

export const deleteStage = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/stages/${id}`);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error deleting stage!', error);
    return false;
  }
}