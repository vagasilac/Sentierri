import { createSlice } from '@reduxjs/toolkit';
import * as rawMaterialService from '../../services/rawMaterialService';

const rawMaterialsSlice = createSlice({
  name: 'rawMaterials',
  initialState: {
    loading: false,
    data: [],
    currentRawMaterial: null,
    error: null,
  },
  reducers: {
    fetchRawMaterialsRequest: (state) => {
      console.log('fetchRawMaterialsRequest');
        state.loading = true;
    },
    fetchRawMaterialsSuccess: (state, action) => {
      console.log('fetchRawMaterialsSuccess');
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchRawMaterialsFailure: (state, action) => {
      console.log('fetchRawMaterialsFailure');
        state.loading = false;
        state.error = action.payload;
    },
    fetchRawMaterialByIdRequest: (state) => {
        state.loading = true;
    },
    fetchRawMaterialByIdSuccess: (state, action) => {
        state.loading = false;
        state.currentRawMaterial = action.payload;
        state.error = null;
    },
    fetchRawMaterialByIdFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addRawMaterialRequest: (state) => {
        state.loading = true;
        },
    addRawMaterialSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
        },
    addRawMaterialFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    updateRawMaterialRequest: (state) => {
        state.loading = true;
        },
    updateRawMaterialSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
        },
    updateRawMaterialFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
      },
});

export const {
    fetchRawMaterialsRequest,
    fetchRawMaterialsSuccess,
    fetchRawMaterialsFailure,
    fetchRawMaterialByIdRequest,
    fetchRawMaterialByIdSuccess,
    fetchRawMaterialByIdFailure,
    addRawMaterialRequest,
    addRawMaterialSuccess,
    addRawMaterialFailure,
    updateRawMaterialRequest,
    updateRawMaterialSuccess,
    updateRawMaterialFailure,
} = rawMaterialsSlice.actions;

export const fetchRawMaterials = () => {
  return async (dispatch) => {
    dispatch(fetchRawMaterialsRequest());
    try {
      const rawMaterials = await rawMaterialService.getAllMaterials();
      dispatch(fetchRawMaterialsSuccess(rawMaterials));
    } catch (error) {
      dispatch(fetchRawMaterialsFailure(error));
    }
  };
}

export const fetchRawMaterialById = (id) => {
  return async (dispatch) => {
    dispatch(fetchRawMaterialByIdRequest());
    try {
      const rawMaterial = await rawMaterialService.getRawMaterial(id);
      dispatch(fetchRawMaterialByIdSuccess(rawMaterial));
    } catch (error) {
      dispatch(fetchRawMaterialByIdFailure(error));
    }
  };
}

// addRawMaterial
export const addRawMaterial = (rawMaterial) => {
  return async (dispatch) => {
    dispatch(addRawMaterialRequest());
    try {
      const addedRawMaterial = await rawMaterialService.addRawMaterial(rawMaterial);
      dispatch(addRawMaterialSuccess(addedRawMaterial));
    } catch (error) {
      dispatch(addRawMaterialFailure(error));
    }
  };
}

// updateRawMaterial
export const updateRawMaterial = (rawMaterial) => {
  return async (dispatch) => {
    dispatch(addRawMaterialRequest());
    try {
      const updatedRawMaterial = await rawMaterialService.updateRawMaterial(rawMaterial);
      dispatch(addRawMaterialSuccess(updatedRawMaterial));
    } catch (error) {
      dispatch(addRawMaterialFailure(error));
    }
  };
}

export default rawMaterialsSlice.reducer;