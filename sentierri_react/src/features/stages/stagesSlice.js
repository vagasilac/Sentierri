import { createSlice } from '@reduxjs/toolkit';
import * as stageService from '../../services/stageService';

const stagesSlice = createSlice({
  name: 'stages',
  initialState: {
    loading: false,
    data: [],
    currentStage: null,
    error: null,
  },
  reducers: {
    fetchStagesRequest: (state) => {
        state.loading = true;
    },
    fetchStagesSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchStagesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    fetchStageByIdRequest: (state) => {
        state.loading = true;
    },
    fetchStageByIdSuccess: (state, action) => {
        state.loading = false;
        state.currentStage = action.payload;
        state.error = null;
    },
    fetchStageByIdFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addStageRequest: (state) => {
        state.loading = true;
    },
    addStageSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    addStageFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateStageRequest: (state) => {
        state.loading = true;
    },
    updateStageSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    updateStageFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteStageRequest: (state) => {
        state.loading = true;
    },
    deleteStageSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    deleteStageFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
  },
});

export const {
    fetchStagesRequest,
    fetchStagesSuccess,
    fetchStagesFailure,
    fetchStageByIdRequest,
    fetchStageByIdSuccess,
    fetchStageByIdFailure,
    addStageRequest,
    addStageSuccess,
    addStageFailure,
    updateStageRequest,
    updateStageSuccess,
    updateStageFailure,
    deleteStageRequest,
    deleteStageSuccess,
    deleteStageFailure,
} = stagesSlice.actions;

export const fetchStages = () => {
  return async (dispatch) => {
    dispatch(fetchStagesRequest());
    try {
      const stages = await stageService.getAllStages();
      dispatch(fetchStagesSuccess(stages));
      console.log('stages', stages);
    } catch (error) {
      dispatch(fetchStagesFailure(error));
    }
  };
}

export const fetchStageById = (id) => {
  return async (dispatch) => {
    console.log('fetchStageById called');
    dispatch(fetchStageByIdRequest());
    try {
      const stage = await stageService.getStage(id);
      dispatch(fetchStageByIdSuccess(stage));
    } catch (error) {
      dispatch(fetchStageByIdFailure(error));
    }
  };
}

// addStage
export const addStage = (stage) => {
  return async (dispatch) => {
    dispatch(addStageRequest());
    try {
      const addedStage = await stageService.addStage(stage);
      dispatch(addStageSuccess(addedStage));
    } catch (error) {
      dispatch(addStageFailure(error));
    }
  };
}

// updateStage
export const updateStage = (stage) => {
  return async (dispatch) => {
    dispatch(updateStageRequest());
    try {
      const updatedStage = await stageService.updateStage(stage);
      dispatch(updateStageSuccess(updatedStage));
    } catch (error) {
      dispatch(updateStageFailure(error));
    }
  };
}

// deleteStage
export const deleteStage = (id) => {
  return async (dispatch) => {
    dispatch(deleteStageRequest());
    try {
      const deletedStage = await stageService.deleteStage(id);
      dispatch(deleteStageSuccess(deletedStage));
    } catch (error) {
      dispatch(deleteStageFailure(error));
    }
  };
}

export default stagesSlice.reducer;






