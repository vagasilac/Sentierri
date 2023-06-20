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
        clearFileUrl: (state) => {
            console.log('fileUploadSlice clearFileUrl');
            state.fileUrl = null;
        },
        deleteFileRequest: (state) => {
            state.loading = true;
        },
        deleteFileSuccess: (state, action) => {
            state.loading = false;
            state.fileUrl = action.payload;
            state.error = null;
        },
        deleteFileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    uploadFileRequest,
    uploadFileSuccess,
    uploadFileFailure,
    clearFileUrl,
    deleteFileRequest,
    deleteFileSuccess,
    deleteFileFailure,
} = fileUploadSlice.actions;

export const uploadFile = (file) => {
    console.log('fileUploadSlice uploadFile file:', file, 'file.name:', file.name, 'file.type:', file.type, 'file.size:', file.size, 'file.lastModified:', file.lastModified, 'file.lastModifiedDate:', file.lastModifiedDate, 'file.webkitRelativePath:', file.webkitRelativePath, 'file.path:', file.path, 'file.lastModifiedDate:', file.lastModified);
    return async (dispatch) => {
        dispatch(uploadFileRequest());
        try {
            const fileUrl = await fileUploadService.uploadFile(file);
            dispatch(uploadFileSuccess(fileUrl));
        } catch (error) {
            dispatch(uploadFileFailure(error.stack));
        }
    };
};

export const deleteFile = (fileUrl) => {
    return async (dispatch) => {
        dispatch(deleteFileRequest());
        try {
            const fileUrl = await fileUploadService.deleteFile(fileUrl);
            dispatch(deleteFileSuccess(fileUrl));
        } catch (error) {
            dispatch(deleteFileFailure(error.stack));
        }
    };
};

export default fileUploadSlice.reducer;
