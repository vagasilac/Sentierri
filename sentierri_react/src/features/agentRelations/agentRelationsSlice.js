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

export default agentRelationsSlice.reducer;
