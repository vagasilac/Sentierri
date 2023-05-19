import {
    FETCH_RAW_MATERIALS_REQUEST,
    FETCH_RAW_MATERIALS_SUCCESS,
    FETCH_RAW_MATERIALS_FAILURE,
  } from './actions';
  
  // Initial state
  const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  // Reducer
  const rawMaterialsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RAW_MATERIALS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_RAW_MATERIALS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case FETCH_RAW_MATERIALS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rawMaterialsReducer;  