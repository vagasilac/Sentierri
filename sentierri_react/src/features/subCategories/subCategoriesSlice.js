import { createSlice } from '@reduxjs/toolkit';
import * as subCategoryService from '../../services/subCategoryService';

const subCategoriesSlice = createSlice({
  name: 'subCategories',
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchSubCategoriesRequest: (state) => {
        state.loading = true;
    },
    fetchSubCategoriesSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchSubCategoriesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addSubCategoryRequest: (state) => {
        state.loading = true;
        },
    addSubCategorySuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
        },
    addSubCategoryFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
  },
});

export const {
    fetchSubCategoriesRequest,
    fetchSubCategoriesSuccess,
    fetchSubCategoriesFailure,
    addSubCategoryRequest,
    addSubCategorySuccess,
    addSubCategoryFailure,
} = subCategoriesSlice.actions;

export const fetchSubCategories = () => {
    return async (dispatch) => {
      dispatch(fetchSubCategoriesRequest());
      try {
        const subCategories = await subCategoryService.getAllSubCategories();
        dispatch(fetchSubCategoriesSuccess(subCategories));
      } catch (error) {
        dispatch(fetchSubCategoriesFailure(error));
      }
    };
  };

export const addSubCategory = (subCategoryData) => {
    return async (dispatch) => {
      dispatch(addSubCategoryRequest());
      try {
        const isSubCategoryAdded = await subCategoryService.addSubCategory(subCategoryData);
        if (isSubCategoryAdded) {
          dispatch(addSubCategorySuccess(subCategoryData));
        } else {
          dispatch(addSubCategoryFailure('Something went wrong!'));
        }
      } catch (error) {
        dispatch(addSubCategoryFailure(error));
      }
    };
  };

export const updateSubCategory = (id, subCategoryData) => {
    return async (dispatch) => {
      dispatch(addSubCategoryRequest());
      try {
        const isSubCategoryUpdated = await subCategoryService.updateSubCategory(id, subCategoryData);
        if (isSubCategoryUpdated) {
          dispatch(addSubCategorySuccess(subCategoryData));
        } else {
          dispatch(addSubCategoryFailure('Something went wrong!'));
        }
      } catch (error) {
        dispatch(addSubCategoryFailure(error));
      }
    };
  };

export default subCategoriesSlice.reducer;