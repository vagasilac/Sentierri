import {
    FETCH_SUPPLIERS,
    FETCH_CATEGORIES,
    FETCH_RAW_MATERIALS,
    FETCH_SUB_CATEGORIES,
    FETCH_SUPPLIER_CATEGORIES,
  } from './actions';
  
  // Initial state
  const initialState = {
    suppliers: [],
    categories: [],
    rawMaterials: [],
    subCategories: [],
    supplierCategories: [],
  };
  
  // Reducers
  export const reducers = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SUPPLIERS:
        return {
          ...state,
          suppliers: action.payload,
        };
  
      case FETCH_CATEGORIES:
        return {
          ...state,
          categories: action.payload,
        };
  
      case FETCH_RAW_MATERIALS:
        return {
          ...state,
          rawMaterials: action.payload,
        };
  
      case FETCH_SUB_CATEGORIES:
        return {
          ...state,
          subCategories: action.payload,
        };
  
      case FETCH_SUPPLIER_CATEGORIES:
        return {
          ...state,
          supplierCategories: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default reducers;
  