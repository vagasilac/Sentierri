import axios from 'axios';
import { API_BASE_URL } from '../config';

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    console.log('fileUploadService uploadFile file:', file, 'file.name:', file.name, 'file.type:', file.type, 'file.size:', file.size, 'file.lastModified:', file.lastModified, 'file.lastModifiedDate:', file.lastModifiedDate, 'file.webkitRelativePath:', file.webkitRelativePath, 'file.path:', file.path, 'file.lastModifiedDate:', file.lastModified);
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