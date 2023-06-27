import { createSlice } from '@reduxjs/toolkit';
import * as modelService from '../../services/modelService';

const modelsSlice = createSlice({
  name: 'models',
  initialState: {
    loading: false,
    data: [],
    currentModel: null,
    error: null,
  },
  reducers: {
    fetchModelsRequest: (state) => {
        state.loading = true;
    },
    fetchModelsSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchModelsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    fetchModelByIdRequest: (state) => {
        state.loading = true;
    },
    fetchModelByIdSuccess: (state, action) => {
        state.loading = false;
        state.currentModel = action.payload;
        state.error = null;
    },
    fetchModelByIdFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addModelRequest: (state) => {
        state.loading = true;
    },
    addModelSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    addModelFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateModelRequest: (state) => {
        state.loading = true;
    },
    updateModelSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    updateModelFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
  },
});

export const {
    fetchModelsRequest,
    fetchModelsSuccess,
    fetchModelsFailure,
    fetchModelByIdRequest,
    fetchModelByIdSuccess,
    fetchModelByIdFailure,
    addModelRequest,
    addModelSuccess,
    addModelFailure,
    updateModelRequest,
    updateModelSuccess,
    updateModelFailure,
} = modelsSlice.actions;

export const fetchModels = () => {
  return async (dispatch) => {
    dispatch(fetchModelsRequest());
    try {
      const models = await modelService.getAllModels();
      dispatch(fetchModelsSuccess(models));
    } catch (error) {
      dispatch(fetchModelsFailure(error));
    }
  };
}

export const fetchModelById = (id) => {
  return async (dispatch) => {
    dispatch(fetchModelByIdRequest());
    try {
      const model = await modelService.getModel(id);
      dispatch(fetchModelByIdSuccess(model));
    } catch (error) {
      dispatch(fetchModelByIdFailure(error));
    }
  };
}

// addModel
export const addModel = (model) => {
  return async (dispatch) => {
    dispatch(addModelRequest());
    try {
      const addedModel = await modelService.addModel(model);
      dispatch(addModelSuccess(addedModel));
    } catch (error) {
      dispatch(addModelFailure(error));
    }
  };
}

// updateModel
export const updateModel = (model) => {
  return async (dispatch) => {
    dispatch(updateModelRequest());
    try {
      const updatedModel = await modelService.updateModel(model);
      dispatch(updateModelSuccess(updatedModel));
    } catch (error) {
      dispatch(updateModelFailure(error));
    }
  };
}

export default modelsSlice.reducer;


