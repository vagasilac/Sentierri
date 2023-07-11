import { createSlice } from '@reduxjs/toolkit';
import * as modellService from '../../services/modellService';

const modellsSlice = createSlice({
  name: 'modells',
  initialState: {
    loading: false,
    data: [],
    currentModell: null,
    error: null,
  },
  reducers: {
    fetchModellsRequest: (state) => {
        state.loading = true;
    },
    fetchModellsSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchModellsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    fetchModellByIdRequest: (state) => {
        state.loading = true;
    },
    fetchModellByIdSuccess: (state, action) => {
        state.loading = false;
        state.currentModell = action.payload;
        state.error = null;
    },
    fetchModellByIdFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addModellRequest: (state) => {
        state.loading = true;
    },
    addModellSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    addModellFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateModellRequest: (state) => {
        state.loading = true;
    },
    updateModellSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    updateModellFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
  },
});

export const {
    fetchModellsRequest,
    fetchModellsSuccess,
    fetchModellsFailure,
    fetchModellByIdRequest,
    fetchModellByIdSuccess,
    fetchModellByIdFailure,
    addModellRequest,
    addModellSuccess,
    addModellFailure,
    updateModellRequest,
    updateModellSuccess,
    updateModellFailure,
} = modellsSlice.actions;

export const fetchModells = () => {
  return async (dispatch) => {
    dispatch(fetchModellsRequest());
    try {
      const modells = await modellService.getAllModells();
      dispatch(fetchModellsSuccess(modells));
      console.log('modells', modells);
    } catch (error) {
      dispatch(fetchModellsFailure(error));
    }
  };
}

export const fetchModellById = (id) => {
  return async (dispatch) => {
    console.log('fetchModellById called');
    dispatch(fetchModellByIdRequest());
    try {
      const modell = await modellService.getModell(id);
      dispatch(fetchModellByIdSuccess(modell));
    } catch (error) {
      dispatch(fetchModellByIdFailure(error));
    }
  };
}

// addModell
export const addModell = (modell) => {
  return async (dispatch) => {
    dispatch(addModellRequest());
    try {
      const addedModell = await modellService.addModell(modell);
      dispatch(addModellSuccess(addedModell));
    } catch (error) {
      dispatch(addModellFailure(error));
    }
  };
}

// updateModell
export const updateModell = (modell) => {
  return async (dispatch) => {
    dispatch(updateModellRequest());
    try {
      const updatedModell = await modellService.updateModell(modell);
      dispatch(updateModellSuccess(updatedModell));
    } catch (error) {
      dispatch(updateModellFailure(error));
    }
  };
}

export default modellsSlice.reducer;


