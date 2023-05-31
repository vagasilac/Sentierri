import { createSlice } from '@reduxjs/toolkit';
import * as customerService from '../../services/customerService';

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchCustomersRequest: (state) => {
        state.loading = true;
    },
    fetchCustomersSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    },
    fetchCustomersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addCustomerRequest: (state) => {
        state.loading = true;
    },
    addCustomerSuccess: (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
    },
    addCustomerFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateCustomerRequest: (state) => {
        state.loading = true;
    },
    updateCustomerSuccess: (state, action) => {
        state.loading = false;
        state.data = state.data.map(customer => 
            customer.id === action.payload.id ? action.payload : customer
        );
        state.error = null;
    },
    updateCustomerFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
},
});

export const {
    fetchCustomersRequest,
    fetchCustomersSuccess,
    fetchCustomersFailure,
    addCustomerRequest,
    addCustomerSuccess,
    addCustomerFailure,
    updateCustomerRequest,
    updateCustomerSuccess,
    updateCustomerFailure,
} = customersSlice.actions;

export const fetchCustomers = () => {
  return async (dispatch) => {
    dispatch(fetchCustomersRequest());
    try {
      const customers = await customerService.getAllCustomers();
      dispatch(fetchCustomersSuccess(customers));
    } catch (error) {
      dispatch(fetchCustomersFailure(error));
    }
  };
};

// addCustomer
export const addCustomer = (customer) => {
  return async (dispatch) => {
    dispatch(addCustomerRequest());
    try {
      const addedCustomer = await customerService.addCustomer(customer);
      dispatch(addCustomerSuccess(addedCustomer));
    } catch (error) {
      dispatch(addCustomerFailure(error));
    }
  };
};

// updateCustomer
export const updateCustomer = (customer) => {
  return async (dispatch) => {
    dispatch(updateCustomerRequest());
    try {
      const updatedCustomer = await customerService.updateCustomer(customer);
      dispatch(updateCustomerSuccess(updatedCustomer));
    } catch (error) {
      dispatch(updateCustomerFailure(error));
    }
  };
};

export default customersSlice.reducer;
