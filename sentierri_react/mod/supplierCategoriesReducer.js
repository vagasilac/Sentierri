import {
    FETCH_SUPPLIER_CATEGORIES_REQUEST,
    FETCH_SUPPLIER_CATEGORIES_SUCCESS,
    FETCH_SUPPLIER_CATEGORIES_FAILURE,
  } from './actions';
  
  // Initial state
  const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  // Reducer
  const supplierCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SUPPLIER_CATEGORIES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_SUPPLIER_CATEGORIES_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case FETCH_SUPPLIER_CATEGORIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default supplierCategoriesReducer;  