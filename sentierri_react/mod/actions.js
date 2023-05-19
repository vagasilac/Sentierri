import * as supplierService from '../services/supplierService';

// Action Types
export const FETCH_SUPPLIERS_REQUEST = 'FETCH_SUPPLIER_REQUEST';
export const FETCH_SUPPLIERS_SUCCESS = 'FETCH_SUPPLIER_SUCCESS';
export const FETCH_SUPPLIERS_FAILURE = 'FETCH_SUPPLIER_FAILURE';
export const ADD_SUPPLIER_REQUEST = 'ADD_SUPPLIER_REQUEST';
export const ADD_SUPPLIER_SUCCESS = 'ADD_SUPPLIER_SUCCESS';
export const ADD_SUPPLIER_FAILURE = 'ADD_SUPPLIER_FAILURE';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const FETCH_RAW_MATERIALS_REQUEST = 'FETCH_RAW_MATERIALS_REQUEST';
export const FETCH_RAW_MATERIALS_SUCCESS = 'FETCH_RAW_MATERIALS_SUCCESS';
export const FETCH_RAW_MATERIALS_FAILURE = 'FETCH_RAW_MATERIALS_FAILURE';

export const FETCH_SUB_CATEGORIES_REQUEST = 'FETCH_SUB_CATEGORIES_REQUEST';
export const FETCH_SUB_CATEGORIES_SUCCESS = 'FETCH_SUB_CATEGORIES_SUCCESS';
export const FETCH_SUB_CATEGORIES_FAILURE = 'FETCH_SUB_CATEGORIES_FAILURE';

export const FETCH_SUPPLIER_CATEGORIES_REQUEST = 'FETCH_SUPPLIER_CATEGORIES_REQUEST';
export const FETCH_SUPPLIER_CATEGORIES_SUCCESS = 'FETCH_SUPPLIER_CATEGORIES_SUCCESS';
export const FETCH_SUPPLIER_CATEGORIES_FAILURE = 'FETCH_SUPPLIER_CATEGORIES_FAILURE';

// Action Creators
// Suppliers
export const fetchSuppliersRequest = () => ({
    type: FETCH_SUPPLIERS_REQUEST,
});

export const fetchSuppliersSuccess = (suppliers) => {
    return {
    type: FETCH_SUPPLIERS_SUCCESS,
    payload: suppliers,
    };
   };

export const fetchSuppliersFailure = (error) => ({
    type: FETCH_SUPPLIERS_FAILURE,
    payload: error,
});

export const addSupplierRequest = () => ({
    type: ADD_SUPPLIER_REQUEST,
});

export const addSupplierSuccess = (supplier) => ({
    type: ADD_SUPPLIER_SUCCESS,
    payload: supplier,
});

export const addSupplierFailure = (error) => ({
    type: ADD_SUPPLIER_FAILURE,
    payload: error,
});
  

// Categories
export const fetchCategoriesRequest = () => ({
    type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories) => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
    type: FETCH_CATEGORIES_FAILURE,
    payload: error,
});

// Raw Materials
export const fetchRawMaterialsRequest = () => ({
    type: FETCH_RAW_MATERIALS_REQUEST,
});

export const fetchRawMaterialsSuccess = (rawMaterials) => ({
    type: FETCH_RAW_MATERIALS_SUCCESS,
    payload: rawMaterials,
});

export const fetchRawMaterialsFailure = (error) => ({
    type: FETCH_RAW_MATERIALS_FAILURE,
    payload: error,
});

// Sub Categories
export const fetchSubCategoriesRequest = () => ({
    type: FETCH_SUB_CATEGORIES_REQUEST,
});

export const fetchSubCategoriesSuccess = (subCategories) => ({
    type: FETCH_SUB_CATEGORIES_SUCCESS,
    payload: subCategories,
});

export const fetchSubCategoriesFailure = (error) => ({
    type: FETCH_SUB_CATEGORIES_FAILURE,
    payload: error,
});

// Supplier Categories
export const fetchSupplierCategoriesRequest = () => ({
    type: FETCH_SUPPLIER_CATEGORIES_REQUEST,
});

export const fetchSupplierCategoriesSuccess = (supplierCategories) => ({
    type: FETCH_SUPPLIER_CATEGORIES_SUCCESS,
    payload: supplierCategories,
});

export const fetchSupplierCategoriesFailure = (error) => ({
    type: FETCH_SUPPLIER_CATEGORIES_FAILURE,
    payload: error,
});


// Asynchronous action creator using Redux Thunk middleware
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