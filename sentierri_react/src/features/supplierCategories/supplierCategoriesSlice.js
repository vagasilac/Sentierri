import { createSlice } from '@reduxjs/toolkit';
import * as supplierCategoryService from '../../services/supplierCategoryService';

const supplierCategoriesSlice = createSlice({
  name: 'supplierCategories',
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchSupplierCategoriesRequest: (state) => {
        state.loading = true;
    },
    fetchSupplierCategoriesSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchSupplierCategoriesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addSupplierCategoryRequest: (state) => {
        state.loading = true;
        },
    addSupplierCategorySuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
        },
    addSupplierCategoryFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    removeSupplierCategoryRequest: (state) => {
        state.loading = true;
        },
    removeSupplierCategorySuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
        },
    removeSupplierCategoryFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        }
  },
});

export const {
    fetchSupplierCategoriesRequest,
    fetchSupplierCategoriesSuccess,
    fetchSupplierCategoriesFailure,
    addSupplierCategoryRequest,
    addSupplierCategorySuccess,
    addSupplierCategoryFailure,
    removeSupplierCategoryRequest,
    removeSupplierCategorySuccess,
    removeSupplierCategoryFailure
} = supplierCategoriesSlice.actions;

export const fetchSupplierCategories = () => {
  return async (dispatch) => {
    dispatch(fetchSupplierCategoriesRequest());
    try {
      const supplierCategories = await supplierCategoryService.getAllSupplierCategories();
      dispatch(fetchSupplierCategoriesSuccess(supplierCategories));
    } catch (error) {
      dispatch(fetchSupplierCategoriesFailure(error));
    }
  };
};

// addSupplierCategory
export const addSupplierCategory = (supplierId, categoryId) => {
  return async (dispatch) => {
    dispatch(addSupplierCategoryRequest());
    try {
      const response = await supplierCategoryService.addSupplierCategory(supplierId, categoryId);
      dispatch(addSupplierCategorySuccess(response.data));
    } catch (error) {
      dispatch(addSupplierCategoryFailure(error));
    }
  };
};



// removeSupplierCategory
export const removeSupplierCategory = (supplierId, categoryId) => {
  return async (dispatch) => {
      dispatch(removeSupplierCategoryRequest());
      try {
          const removedSupplierCategory = await supplierCategoryService.removeSupplierCategory(supplierId, categoryId);
          dispatch(removeSupplierCategorySuccess(removedSupplierCategory));
      } catch (error) {
          dispatch(removeSupplierCategoryFailure(error));
      }
  };
};


export default supplierCategoriesSlice.reducer;