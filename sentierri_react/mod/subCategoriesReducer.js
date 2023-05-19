import {
    FETCH_SUB_CATEGORIES_REQUEST,
    FETCH_SUB_CATEGORIES_SUCCESS,
    FETCH_SUB_CATEGORIES_FAILURE,
  } from './actions';
  
  // Initial state
  const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  // Reducer
  const subCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SUB_CATEGORIES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_SUB_CATEGORIES_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case FETCH_SUB_CATEGORIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default subCategoriesReducer;
  