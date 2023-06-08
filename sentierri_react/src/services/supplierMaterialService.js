import axios from "axios";
import { API_BASE_URL } from "../config";

// getSupplierMaterial
export const getSupplierMaterial = async (supplierId, materialId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/suppliermaterials/${supplierId}/${materialId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching supplierMaterial:", error);
    return null;
  }
}

// addSupplierMaterial
export const addSupplierMaterial = async (supplierId, materialId) => {
  console.log('supplierMaterialService addSupplierMaterial','supplierId:', supplierId, 'materialId:', materialId);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/suppliermaterials/${supplierId}/${materialId}`
    );
    return response.status === 201; // Return true if the status code is 201 (Created)
  } catch (error) {
    console.error("Error adding supplierMaterial!", error);
    return false;
  }
}

// getAllSupplierMaterials
export const getAllSupplierMaterials = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/suppliermaterials`);
    console.log("response.data:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching supplierMaterials:", error.stack);
    return null;
  }
}

// removeSupplierMaterial
export const removeSupplierMaterial = async (supplierId, materialId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/suppliermaterials/${supplierId}/${materialId}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to delete supplier material");
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting supplierMaterial!", error);
    return false;
  }
}

// getSupplierMaterialBySupplierId
export const getSupplierMaterialsBySupplierId = async (supplierId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/suppliermaterials/${supplierId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching supplierMaterial:", error);
    return null;
  }
}

// getSupplierMaterialByMaterialId
export const getSupplierMaterialsByMaterialId = async (materialId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/suppliermaterials/material/${materialId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching supplierMaterial:", error);
    return null;
  }
}