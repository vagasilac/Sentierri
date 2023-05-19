import {
    FETCH_SUPPLIERS_REQUEST,
    FETCH_SUPPLIERS_SUCCESS,
    FETCH_SUPPLIERS_FAILURE,
    ADD_SUPPLIER_REQUEST,
    ADD_SUPPLIER_SUCCESS,
    ADD_SUPPLIER_FAILURE,
  } from './actions';
  
  // Initial state
  const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  // Reducer
  const suppliersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SUPPLIERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_SUPPLIERS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case FETCH_SUPPLIERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case ADD_SUPPLIER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ADD_SUPPLIER_SUCCESS:
        return {
          ...state,
          loading: false,
          data: [...state.data, action.payload],
          error: null,
        };
      case ADD_SUPPLIER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default suppliersReducer;  