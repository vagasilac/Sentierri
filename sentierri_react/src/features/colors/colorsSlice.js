import { createSlice } from '@reduxjs/toolkit';
import * as colorService from '../../services/colorService';

const colorsSlice = createSlice({
  name: 'colors',
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchColorsRequest: (state) => {
        state.loading = true;
    },
    fetchColorsSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchColorsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    fetchColorByIdRequest: (state) => {
        state.loading = true;
    },
    fetchColorByIdSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchColorByIdFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addColorRequest: (state) => {
        state.loading = true;
        },
    addColorSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
        },
    addColorFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    updateColorRequest: (state) => {
        state.loading = true;
        },
    updateColorSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
        },
    updateColorFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
  },
});

export const {
    fetchColorsRequest,
    fetchColorsSuccess,
    fetchColorsFailure,
    fetchColorByIdRequest,
    fetchColorByIdSuccess,
    fetchColorByIdFailure,
    addColorRequest,
    addColorSuccess,
    addColorFailure,
    updateColorRequest,
    updateColorSuccess,
    updateColorFailure,
} = colorsSlice.actions;

export const fetchColors = () => {
  return async (dispatch) => {
    dispatch(fetchColorsRequest());
    try {
      const colors = await colorService.getAllColors();
      dispatch(fetchColorsSuccess(colors));
    } catch (error) {
      dispatch(fetchColorsFailure(error));
    }
  };
}

export const fetchColorById = (id) => {
  return async (dispatch) => {
    dispatch(fetchColorByIdRequest());
    try {
      const color = await colorService.getColor(id);
      dispatch(fetchColorByIdSuccess(color));
    } catch (error) {
      dispatch(fetchColorByIdFailure(error));
    }
  };
}

// addColor
export const addColor = (color) => {
  return async (dispatch) => {
    dispatch(addColorRequest());
    try {
      const addedColor = await colorService.addColor(color);
      dispatch(addColorSuccess(addedColor));
    } catch (error) {
      dispatch(addColorFailure(error));
    }
  };
};

// updateColor
export const updateColor = (color) => {
  return async (dispatch) => {
    dispatch(addColorRequest());
    try {
      const updatedColor = await colorService.updateColor(color);
      dispatch(addColorSuccess(updatedColor));
    } catch (error) {
      dispatch(addColorFailure(error));
    }
  };
};

export default colorsSlice.reducer;