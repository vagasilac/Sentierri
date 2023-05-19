import { createSlice } from '@reduxjs/toolkit';
import * as agentRelationsService from '../../services/agentRelationsService';

const agentRelationsSlice = createSlice({
  name: 'agentRelations',
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchAgentRelationsRequest: (state) => {
        state.loading = true;
    },
    fetchAgentRelationsSuccess: (state, action) => {
        console.log('agentRelationsSlice fetchAgentRelationsSuccess action.payload:', action.payload);
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchAgentRelationsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    fetchAgentRelationByIdRequest: (state) => {
        state.loading = true;
    },
    fetchAgentRelationByIdSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchAgentRelationByIdFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addAgentRelationRequest: (state) => {
        state.loading = true;
        },
    addAgentRelationSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
        },
    addAgentRelationFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    removeAgentRelationRequest: (state) => {
        state.loading = true;
        },
    removeAgentRelationSuccess: (state, action) => {
        state.loading = false;
        state.data = state.data.filter((agentRelation) => agentRelation.id !== action.payload);
        state.error = null;
        },
    removeAgentRelationFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        }
    },
});

export const {
    fetchAgentRelationsRequest,
    fetchAgentRelationsSuccess,
    fetchAgentRelationsFailure,
    fetchAgentRelationByIdRequest,
    fetchAgentRelationByIdSuccess,
    fetchAgentRelationByIdFailure,
    addAgentRelationRequest,
    addAgentRelationSuccess,
    addAgentRelationFailure,
    removeAgentRelationRequest,
    removeAgentRelationSuccess,
    removeAgentRelationFailure,
} = agentRelationsSlice.actions;

export const fetchAgentRelations = () => {
    console.log('fetchAgentRelations was called');

    return async (dispatch) => {
        dispatch(fetchAgentRelationsRequest());
        try {
        const agentRelations = await agentRelationsService.getAllAgentRelations();
        console.log('Agent Relations:', agentRelations);
        dispatch(fetchAgentRelationsSuccess(agentRelations));
        } catch (error) {
        dispatch(fetchAgentRelationsFailure(error));
        }
    };
}

export const fetchAgentRelationById = (id) => {
    return async (dispatch) => {
        dispatch(fetchAgentRelationByIdRequest());
        try {
        const agentRelation = await agentRelationsService.getAgentRelation(id);
        dispatch(fetchAgentRelationByIdSuccess(agentRelation));
        } catch (error) {
        dispatch(fetchAgentRelationByIdFailure(error));
        }
    };
}

export const addAgentRelation = (agentId, supplierId) => {
    return async (dispatch) => {
        console.log('addAgentRelation dispatch with agent id: ' + agentId + ' and supplier id: ' + supplierId); //OK
        dispatch(addAgentRelationRequest());
        try {
        const success = await agentRelationsService.addAgentRelation(agentId, supplierId);
        if (success) {
            dispatch(addAgentRelationSuccess({agentId, supplierId}));
        } else {
            dispatch(addAgentRelationFailure('Error!'));
        }
        } catch (error) {
        dispatch(addAgentRelationFailure(error));
        }
    };
}

// removeAgentRelation
export const removeAgentRelation = (agentId) => {
    return async (dispatch) => {
        console.log('removeAgentRelation dispatch with agent id: ' + agentId);
        dispatch(removeAgentRelationRequest());
        try {
        const success = await agentRelationsService.removeAgentRelation(agentId);
        if (success) {
            dispatch(removeAgentRelationSuccess(agentId));
        } else {
            dispatch(removeAgentRelationFailure('Error!'));
        }
        } catch (error) {
        dispatch(removeAgentRelationFailure(error));
        }
    };
}

export default agentRelationsSlice.reducer;
