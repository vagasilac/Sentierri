import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getAgentRelation = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agentrelations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching agentRelation:', error);
    return null;
  }
};

export const addAgentRelation = async (agentId, supplierId) => {
    console.log('agentRelationsService addAgentRelation','agentId:', agentId, 'supplierId:', supplierId); //OK
    try {
      const response = await axios.post(`${API_BASE_URL}/agentrelations`, { agentId: agentId, supplierId: supplierId });
      return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
      console.error('Error adding agentRelation!', error);
      return false;
    }
};

export const getAllAgentRelations = async () => {
  console.log('Attempting to get all agent relations...');
  try {
    const response = await axios.get(`${API_BASE_URL}/agentrelations`);
    console.log('Response from server:', response);
    console.log('getAllAgentRelations response.data:', response.data);
    return response.data;
  } catch (error) {
    console.log('Error block reached')
    console.error('Error occurred while trying to get all agent relations:', error);
    console.error('Error fetching agentRelations:', error.stack);
    return null;
  }
};
