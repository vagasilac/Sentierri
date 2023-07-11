import axios from "axios";
import { API_BASE_URL } from "../config";

// getFinishedProduct
export const getFinishedProduct = async (finishedProductId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/finished-products/${finishedProductId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching finishedProduct:", error);
    return null;
  }
}

// addFinishedProduct
export const addFinishedProduct = async (finishedProduct) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/finished-products/`,
      finishedProduct
    );
    return response.status === 201; // Return true if the status code is 201 (Created)
  } catch (error) {
    console.error("Error adding finishedProduct!", error);
    return false;
  }
}

// getAllFinishedProducts
export const getAllFinishedProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/finished-products/`);
    console.log("getAllFinishedProducts response.data:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching finishedProducts:", error.stack);
    return null;
  }
}

// removeFinishedProduct
export const removeFinishedProduct = async (finishedProductId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/finished-products/${finishedProductId}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to delete finished product");
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting finishedProduct!", error);
    return false;
  }
}

// updateFinishedProduct
export const updateFinishedProduct = async (finishedProduct) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/finished-products/${finishedProduct.id}`,
      finishedProduct
    );
    return response.status === 200; // Return true if the status code is 200 (OK)
  } catch (error) {
    console.error("Error updating finishedProduct!", error);
    return false;
  }
}

// getFinishedProductsByModellId
export const getFinishedProductsByModellId = async (modellId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/finished-products/modell/${modellId}`
    );
    console.log(
      "getFinishedProductsByModellId response.data:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching finishedProducts:", error);
    return null;
  }
}

// getFinishedProductsByColorId
export const getFinishedProductsByColorId = async (colorId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/finished-products/color/${colorId}`
    );
    console.log(
      "getFinishedProductsByColorId response.data:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching finishedProducts:", error);
    return null;
  }
}

