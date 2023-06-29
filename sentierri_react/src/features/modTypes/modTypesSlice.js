import { createSlice } from '@reduxjs/toolkit';
import * as modTypeService from '../../services/modTypeService';

const modTypesSlice = createSlice({
  name: 'modTypes',
  initialState: {
    loading: false,
    data: [],
    currentModType: null,
    error: null,
  },
  reducers: {
    fetchModTypesRequest: (state) => {
        state.loading = true;
    },
    fetchModTypesSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchModTypesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    fetchModTypeByIdRequest: (state) => {
        state.loading = true;
    },
    fetchModTypeByIdSuccess: (state, action) => {
        state.loading = false;
        state.currentModType = action.payload;
        state.error = null;
    },
    fetchModTypeByIdFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addModTypeRequest: (state) => {
        state.loading = true;
    },
    addModTypeSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    addModTypeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateModTypeRequest: (state) => {
        state.loading = true;
    },
    updateModTypeSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    updateModTypeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
  },
});

export const {
    fetchModTypesRequest,
    fetchModTypesSuccess,
    fetchModTypesFailure,
    fetchModTypeByIdRequest,
    fetchModTypeByIdSuccess,
    fetchModTypeByIdFailure,
    addModTypeRequest,
    addModTypeSuccess,
    addModTypeFailure,
    updateModTypeRequest,
    updateModTypeSuccess,
    updateModTypeFailure,
} = modTypesSlice.actions;

export const fetchModTypes = () => {
  return async (dispatch) => {
    dispatch(fetchModTypesRequest());
    try {
      const modTypes = await modTypeService.getAllModTypes();
      dispatch(fetchModTypesSuccess(modTypes));
      console.log('modTypes', modTypes);
    } catch (error) {
      dispatch(fetchModTypesFailure(error));
    }
  };
}

export const fetchModTypeById = (id) => {
  return async (dispatch) => {
    console.log('fetchModTypeById called');
    dispatch(fetchModTypeByIdRequest());
    try {
      const modType = await modTypeService.getModType(id);
      dispatch(fetchModTypeByIdSuccess(modType));
    } catch (error) {
      dispatch(fetchModTypeByIdFailure(error));
    }
  };
}

// addModType
export const addModType = (modType) => {
  return async (dispatch) => {
    dispatch(addModTypeRequest());
    try {
      const addedModType = await modTypeService.addModType(modType);
      dispatch(addModTypeSuccess(addedModType));
    } catch (error) {
      dispatch(addModTypeFailure(error));
    }
  };
}

// updateModType
export const updateModType = (modType) => {
  return async (dispatch) => {
    dispatch(updateModTypeRequest());
    try {
      const updatedModType = await modTypeService.updateModType(modType);
      dispatch(updateModTypeSuccess(updatedModType));
    } catch (error) {
      dispatch(updateModTypeFailure(error));
    }
  };
}

export default modTypesSlice.reducer;