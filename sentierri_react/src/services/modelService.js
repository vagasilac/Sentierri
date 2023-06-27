import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getModel = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/models/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching model:', error);
    return null;
  }
}

export const addModel = async (modelData) => {
    console.log('modelData:', modelData);
    try {
      const response = await axios.post(`${API_BASE_URL}/models`, modelData);
      return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
      console.error('Error adding model!', error);
      return false;
    }
}

export const updateModel = async (modelData) => {
  console.log('updateModel modelService modelData:', modelData);
  try {
    const response = await axios.put(`${API_BASE_URL}/models/${modelData.id}`, modelData);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error updating model!', error);
    return false;
  }
}

export const getAllModels = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/models`);
    console.log('response.data:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching models:', error.stack);
    return null;
  }
}

export const deleteModel = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/models/${id}`);
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error('Error deleting model!', error);
    return false;
  }
}

