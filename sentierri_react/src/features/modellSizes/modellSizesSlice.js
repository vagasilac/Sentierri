import { createSlice } from '@reduxjs/toolkit';
import * as modellSizeService from '../../services/modellSizeService';

const modellSizesSlice = createSlice({
  name: 'modellSizes',
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchModellSizesRequest: (state) => {
        state.loading = true;
    },
    fetchModellSizesSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchModellSizesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearModellSizesRequest: (state) => {
        state.loading = true;
    },
    clearModellSizesSuccess: (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = null;
    },
    clearModellSizesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    fetchModellSizesByModellIdRequest: (state) => {
      state.loading = true;
    },
    fetchModellSizesByModellIdSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log('modellSizesSlice - fetchModellSizesByModellIdSuccess - state.data: ', state.data);
      state.error = null;
    },
    fetchModellSizesByModellIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addModellSizeRequest: (state) => {
        state.loading = true;
    },
    addModellSizeSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    addModellSizeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    removeModellSizeRequest: (state) => {
        state.loading = true;
    },
    removeModellSizeSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    removeModellSizeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
  },
});

export const {
    fetchModellSizesRequest,
    fetchModellSizesSuccess,
    fetchModellSizesFailure,
    fetchModellSizesByModellIdRequest,
    fetchModellSizesByModellIdSuccess,
    fetchModellSizesByModellIdFailure,
    clearModellSizesRequest,
    clearModellSizesSuccess,
    clearModellSizesFailure,
    addModellSizeRequest,
    addModellSizeSuccess,
    addModellSizeFailure,
    removeModellSizeRequest,
    removeModellSizeSuccess,
    removeModellSizeFailure
} = modellSizesSlice.actions;

export const fetchModellSizes = () => {
  return async (dispatch) => {
    dispatch(fetchModellSizesRequest());
    try {
      const modellSizes = await modellSizeService.getAllModellSizes();
      dispatch(fetchModellSizesSuccess(modellSizes));
    } catch (error) {
      dispatch(fetchModellSizesFailure(error));
    }
  };
}

export const clearModellSizes = () => {
  return async (dispatch) => {
    console.log('modellSizesSlice - clearModellSizes - dispatching clearModellSizesRequest');
    dispatch(clearModellSizesRequest());
    try {
      console.log('modellSizesSlice - clearModellSizes - dispatching clearModellSizesSuccess');
      dispatch(clearModellSizesSuccess());
    } catch (error) {
      console.log('modellSizesSlice - clearModellSizes - dispatching clearModellSizesFailure');
      dispatch(clearModellSizesFailure(error));
    }
  };
}

export const fetchModellSizesByModellId = (modellId) => {
  return async (dispatch) => {
    dispatch(fetchModellSizesByModellIdRequest());
    try {
      const modellSizes = await modellSizeService.getModellSizesByModellId(modellId);
      console.log('modellSizesSlice - fetchModellSizesByModellId - modellSizes: ', modellSizes);
      dispatch(fetchModellSizesByModellIdSuccess(modellSizes));
    } catch (error) {
      dispatch(fetchModellSizesByModellIdFailure(error));
    }
  };
}

// addModellSize
export const addModellSize = (modellId, sizeId) => {
  return async (dispatch) => {
    dispatch(addModellSizeRequest());
    try {
      const response = await modellSizeService.addModellSize(modellId, sizeId);
      dispatch(addModellSizeSuccess(response.data));
    } catch (error) {
      dispatch(addModellSizeFailure(error));
    }
  };
}

// removeModellSize
export const removeModellSize = (modellId, sizeId) => {
  return async (dispatch) => {
      dispatch(removeModellSizeRequest());
      try {
          const removedModellSize = await modellSizeService.removeModellSize(modellId, sizeId);
          dispatch(removeModellSizeSuccess(removedModellSize));
      } catch (error) {
          dispatch(removeModellSizeFailure(error));
      }
  };
}

export default modellSizesSlice.reducer;
