import { createSlice } from '@reduxjs/toolkit';
import * as sizeService from '../../services/sizeService';

const sizesSlice = createSlice({
  name: 'sizes',
  initialState: {
    loading: false,
    data: [],
    currentSize: null,
    error: null,
  },
  reducers: {
    fetchSizesRequest: (state) => {
        state.loading = true;
    },
    fetchSizesSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchSizesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    fetchSizeByIdRequest: (state) => {
        state.loading = true;
    },
    fetchSizeByIdSuccess: (state, action) => {
        state.loading = false;
        state.currentSize = action.payload;
        state.error = null;
    },
    fetchSizeByIdFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addSizeRequest: (state) => {
        state.loading = true;
    },
    addSizeSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    addSizeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateSizeRequest: (state) => {
        state.loading = true;
    },
    updateSizeSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    updateSizeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
  },
});

export const {
    fetchSizesRequest,
    fetchSizesSuccess,
    fetchSizesFailure,
    fetchSizeByIdRequest,
    fetchSizeByIdSuccess,
    fetchSizeByIdFailure,
    addSizeRequest,
    addSizeSuccess,
    addSizeFailure,
    updateSizeRequest,
    updateSizeSuccess,
    updateSizeFailure,
} = sizesSlice.actions;

export const fetchSizes = () => {
  return async (dispatch) => {
    dispatch(fetchSizesRequest());
    try {
      const sizes = await sizeService.getAllSizes();
      dispatch(fetchSizesSuccess(sizes));
    } catch (error) {
      dispatch(fetchSizesFailure(error));
    }
  };
}

export const fetchSizeById = (id) => {
  return async (dispatch) => {
    dispatch(fetchSizeByIdRequest());
    try {
      const size = await sizeService.getSize(id);
      dispatch(fetchSizeByIdSuccess(size));
    } catch (error) {
      dispatch(fetchSizeByIdFailure(error));
    }
  };
}

// addSize
export const addSize = (size) => {
  return async (dispatch) => {
    dispatch(addSizeRequest());
    try {
      const addedSize = await sizeService.addSize(size);
      dispatch(addSizeSuccess(addedSize));
    } catch (error) {
      dispatch(addSizeFailure(error));
    }
  };
}

// updateSize
export const updateSize = (size) => {
  return async (dispatch) => {
    dispatch(updateSizeRequest());
    try {
      const updatedSize = await sizeService.updateSize(size);
      dispatch(updateSizeSuccess(updatedSize));
    } catch (error) {
      dispatch(updateSizeFailure(error));
    }
  };
}

export default sizesSlice.reducer;