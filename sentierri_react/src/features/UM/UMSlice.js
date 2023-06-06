import { createSlice } from '@reduxjs/toolkit';
import * as UMService from '../../services/UMService';

const UMSlice = createSlice({
  name: 'UM',
  initialState: {
    loading: false,
    data: [],
    currentUM: null,
    error: null,
  },
  reducers: {
    fetchUMsRequest: (state) => {
        state.loading = true;
    },
    fetchUMsSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchUMsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    fetchUMByIdRequest: (state) => {
        state.loading = true;
    },
    fetchUMByIdSuccess: (state, action) => {
        state.loading = false;
        state.currentUM = action.payload;
        state.error = null;
    },
    fetchUMByIdFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addUMRequest: (state) => {
        state.loading = true;
        },
    addUMSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
        },
    addUMFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    updateUMRequest: (state) => {
        state.loading = true;
        },
    updateUMSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
        },
    updateUMFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
  },
});

export const {
    fetchUMsRequest,
    fetchUMsSuccess,
    fetchUMsFailure,
    fetchUMByIdRequest,
    fetchUMByIdSuccess,
    fetchUMByIdFailure,
    addUMRequest,
    addUMSuccess,
    addUMFailure,
    updateUMRequest,
    updateUMSuccess,
    updateUMFailure,
} = UMSlice.actions;

export const fetchUMs = () => {
  return async (dispatch) => {
    dispatch(fetchUMsRequest());
    try {
      const UMs = await UMService.getAllUMs();
      dispatch(fetchUMsSuccess(UMs));
    } catch (error) {
      dispatch(fetchUMsFailure(error));
    }
  };
}

export const fetchUMById = (id) => {
  return async (dispatch) => {
    dispatch(fetchUMByIdRequest());
    try {
      const UM = await UMService.getUM(id);
      dispatch(fetchUMByIdSuccess(UM));
    } catch (error) {
      dispatch(fetchUMByIdFailure(error));
    }
  };
}

// addUM
export const addUM = (UM) => {
  return async (dispatch) => {
    dispatch(addUMRequest());
    try {
      const addedUM = await UMService.addUM(UM);
      dispatch(addUMSuccess(addedUM));
    } catch (error) {
      dispatch(addUMFailure(error));
    }
  };
}

// updateUM
export const updateUM = (UM) => {
  return async (dispatch) => {
    dispatch(updateUMRequest());
    try {
      const updatedUM = await UMService.updateUM(UM);
      dispatch(updateUMSuccess(updatedUM));
    } catch (error) {
      dispatch(updateUMFailure(error));
    }
  };
}

export default UMSlice.reducer;
