import { createSlice } from '@reduxjs/toolkit';
import * as modellColorService from '../../services/modellColorService';

const modellColorsSlice = createSlice({
  name: 'modellColors',
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchModellColorsRequest: (state) => {
        state.loading = true;
    },
    fetchModellColorsSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchModellColorsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    fetchModellColorsByModellIdRequest: (state) => {
      state.loading = true;
    },
    fetchModellColorsByModellIdSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log('modellColorsSlice - fetchModellColorsByModellIdSuccess - state.data: ', state.data);
      state.error = null;
    },
    fetchModellColorsByModellIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addModellColorRequest: (state) => {
        state.loading = true;
    },
    addModellColorSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    addModellColorFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    removeModellColorRequest: (state) => {
        state.loading = true;
    },
    removeModellColorSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    removeModellColorFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
  },
});

export const {
    fetchModellColorsRequest,
    fetchModellColorsSuccess,
    fetchModellColorsFailure,
    fetchModellColorsByModellIdRequest,
    fetchModellColorsByModellIdSuccess,
    fetchModellColorsByModellIdFailure,
    addModellColorRequest,
    addModellColorSuccess,
    addModellColorFailure,
    removeModellColorRequest,
    removeModellColorSuccess,
    removeModellColorFailure
} = modellColorsSlice.actions;

export const fetchModellColors = () => {
  return async (dispatch) => {
    dispatch(fetchModellColorsRequest());
    try {
      const modellColors = await modellColorService.getAllModellColors();
      dispatch(fetchModellColorsSuccess(modellColors));
    } catch (error) {
      dispatch(fetchModellColorsFailure(error));
    }
  };
}

export const fetchModellColorsByModellId = (modellId) => {
  return async (dispatch) => {
    dispatch(fetchModellColorsByModellIdRequest());
    try {
      const modellColors = await modellColorService.getModellColorsByModellId(modellId);
      console.log('modellColorsSlice - fetchModellColorsByModellId - modellColors: ', modellColors);
      dispatch(fetchModellColorsByModellIdSuccess(modellColors));
    } catch (error) {
      dispatch(fetchModellColorsByModellIdFailure(error));
    }
  };
}

// addModellColor
export const addModellColor = (modellId, colorId) => {
  return async (dispatch) => {
    dispatch(addModellColorRequest());
    try {
      const response = await modellColorService.addModellColor(modellId, colorId);
      dispatch(addModellColorSuccess(response.data));
    } catch (error) {
      dispatch(addModellColorFailure(error));
    }
  };
}

// removeModellColor
export const removeModellColor = (modellId, colorId) => {
  return async (dispatch) => {
      dispatch(removeModellColorRequest());
      try {
          const removedModellColor = await modellColorService.removeModellColor(modellId, colorId);
          dispatch(removeModellColorSuccess(removedModellColor));
      } catch (error) {
          dispatch(removeModellColorFailure(error));
      }
  };
}

export default modellColorsSlice.reducer;
