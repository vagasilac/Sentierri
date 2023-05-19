import { createSlice } from '@reduxjs/toolkit';
import * as supplierService from '../../services/supplierService';

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchSuppliersRequest: (state) => {
        state.loading = true;
    },
    fetchSuppliersSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchSuppliersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addSupplierRequest: (state) => {
        state.loading = true;
        },
    addSupplierSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
        },
    addSupplierFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    updateSupplierRequest: (state) => {
        state.loading = true;
        },
    updateSupplierSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
        },
    updateSupplierFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
  },
});

export const {
    fetchSuppliersRequest,
    fetchSuppliersSuccess,
    fetchSuppliersFailure,
    addSupplierRequest,
    addSupplierSuccess,
    addSupplierFailure,
    updateSupplierRequest,
    updateSupplierSuccess,
    updateSupplierFailure,
} = suppliersSlice.actions;

export const fetchSuppliers = () => {
  return async (dispatch) => {
    dispatch(fetchSuppliersRequest());
    try {
      const suppliers = await supplierService.getAllSuppliers();
      dispatch(fetchSuppliersSuccess(suppliers));
    } catch (error) {
      dispatch(fetchSuppliersFailure(error));
    }
  };
};

// addSupplier
export const addSupplier = (supplier) => {
  return async (dispatch) => {
    dispatch(addSupplierRequest());
    try {
      const addedSupplier = await supplierService.addSupplier(supplier);
      dispatch(addSupplierSuccess(addedSupplier));
    } catch (error) {
      dispatch(addSupplierFailure(error));
    }
  };
};

// updateSupplier
export const updateSupplier = (supplier) => {
  return async (dispatch) => {
    dispatch(addSupplierRequest());
    try {
      const updatedSupplier = await supplierService.updateSupplier(supplier);
      dispatch(addSupplierSuccess(updatedSupplier));
    } catch (error) {
      dispatch(addSupplierFailure(error));
    }
  };
};

export default suppliersSlice.reducer;