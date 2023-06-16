import { createSlice } from '@reduxjs/toolkit';
import * as fileUploadService from '../../services/fileUploadService';

const fileUploadSlice = createSlice({
    name: 'fileUpload',
    initialState: {
        loading: false,
        fileUrl: null,
        error: null,
    },
    reducers: {
        uploadFileRequest: (state) => {
            state.loading = true;
        },
        uploadFileSuccess: (state, action) => {
            state.loading = false;
            state.fileUrl = action.payload;
            state.error = null;
        },
        uploadFileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    uploadFileRequest,
    uploadFileSuccess,
    uploadFileFailure,
} = fileUploadSlice.actions;

export const uploadFile = (file) => {
    return async (dispatch) => {
        dispatch(uploadFileRequest());
        try {
            const fileUrl = await fileUploadService.uploadFile(file);
            dispatch(uploadFileSuccess(fileUrl));
        } catch (error) {
            dispatch(uploadFileFailure(error));
        }
    };
};

export default fileUploadSlice.reducer;
