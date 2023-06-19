import axios from 'axios';
import { API_BASE_URL } from '../config';

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_BASE_URL}/uploads`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.fileUrl;
  } catch (error) {
    console.error('Error uploading file!', error, 'error response:',error.response);
    return null;
  }
};