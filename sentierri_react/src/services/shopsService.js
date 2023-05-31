import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getShop = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/shops/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching shop:', error);
        return null;
    }
}

export const addShop = async (shopData) => {
    console.log('shopData:', shopData);
    try {
        const response = await axios.post(`${API_BASE_URL}/shops`, shopData);
        return response.status === 201; // Return true if the status code is 201 (Created)
    } catch (error) {
        console.error('Error adding shop:', error.stack);
        return false;
    }
}

export const updateShop = async (shopData) => {
    console.log('updateShop shopService shopData:', shopData);
    try {
        const response = await axios.put(`${API_BASE_URL}/shops/${shopData.id}`, shopData);
        return response.status === 200; // Return true if the status code is 200 (OK)
    } catch (error) {
        console.error('Error updating shop!', error);
        return false;
    }
}

export const getAllShops = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/shops`);
        console.log('response.data:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching shops:', error.stack);
        return null;
    }
}

export const deleteShop = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/shops/${id}`);
        return response.status === 200; // Return true if the status code is 200 (OK)
    }
    catch (error) {
        console.error('Error deleting shop!', error);
        return false;
    }
}