import { createSlice } from '@reduxjs/toolkit';
import * as categoryService from '../../services/categoryService';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchCategoriesRequest: (state) => {
        state.loading = true;
    },
    fetchCategoriesSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchCategoriesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addCategoryRequest: (state) => {
        state.loading = true;
        },
    addCategorySuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
        },
    addCategoryFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
  },
});

export const {
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    addCategoryRequest,
    addCategorySuccess,
    addCategoryFailure,
} = categoriesSlice.actions;

export const fetchCategories = () => {
    return async (dispatch) => {
      dispatch(fetchCategoriesRequest());
      try {
        const categories = await categoryService.getAllCategories();
        dispatch(fetchCategoriesSuccess(categories));
      } catch (error) {
        dispatch(fetchCategoriesFailure(error));
      }
    };
  };

export default categoriesSlice.reducer;