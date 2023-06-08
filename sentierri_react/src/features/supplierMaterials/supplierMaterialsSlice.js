import { createSlice } from "@reduxjs/toolkit";
import * as supplierMaterialService from "../../services/supplierMaterialService";

const supplierMaterialsSlice = createSlice({
  name: "supplierMaterials",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchSupplierMaterialsRequest: (state) => {
      state.loading = true;
    },
    fetchSupplierMaterialsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchSupplierMaterialsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSupplierMaterialsBySupplierIdRequest: (state) => {
      state.loading = true;
    },
    fetchSupplierMaterialsBySupplierIdSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchSupplierMaterialsBySupplierIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSupplierMaterialsByMaterialIdRequest: (state) => {
      state.loading = true;
    },
    fetchSupplierMaterialsByMaterialIdSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchSupplierMaterialsByMaterialIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSupplierMaterialRequest: (state) => {
      state.loading = true;
    },
    addSupplierMaterialSuccess: (state, action) => {
      state.loading = false;
      state.data = [...state.data, action.payload];
      state.error = null;
    },
    addSupplierMaterialFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeSupplierMaterialRequest: (state) => {
      state.loading = true;
    },
    removeSupplierMaterialSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter(
        (supplierMaterial) =>
          supplierMaterial.id !== action.payload.id
      );
      state.error = null;
    },
    removeSupplierMaterialFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSupplierMaterialsRequest,
  fetchSupplierMaterialsSuccess,
  fetchSupplierMaterialsFailure,
  fetchSupplierMaterialsBySupplierIdRequest,
  fetchSupplierMaterialsBySupplierIdSuccess,
  fetchSupplierMaterialsBySupplierIdFailure,
  fetchSupplierMaterialsByMaterialIdRequest,
  fetchSupplierMaterialsByMaterialIdSuccess,
  fetchSupplierMaterialsByMaterialIdFailure,
  addSupplierMaterialRequest,
  addSupplierMaterialSuccess,
  addSupplierMaterialFailure,
  removeSupplierMaterialRequest,
  removeSupplierMaterialSuccess,
  removeSupplierMaterialFailure,
} = supplierMaterialsSlice.actions;

export const fetchSupplierMaterials = () => {
  return async (dispatch) => {
    dispatch(fetchSupplierMaterialsRequest());
    try {
      const supplierMaterials = await supplierMaterialService.getAllSupplierMaterials();
      dispatch(fetchSupplierMaterialsSuccess(supplierMaterials));
    } catch (error) {
      dispatch(fetchSupplierMaterialsFailure(error));
    }
  };
}

export const fetchSupplierMaterialsBySupplierId = (supplierId) => {
  return async (dispatch) => {
    dispatch(fetchSupplierMaterialsBySupplierIdRequest());
    try {
      const supplierMaterials = await supplierMaterialService.getSupplierMaterialsBySupplierId(supplierId);
      dispatch(fetchSupplierMaterialsBySupplierIdSuccess(supplierMaterials));
    } catch (error) {
      dispatch(fetchSupplierMaterialsBySupplierIdFailure(error));
    }
  };
}

export const fetchSupplierMaterialsByMaterialId = (materialId) => {
  return async (dispatch) => {
    dispatch(fetchSupplierMaterialsByMaterialIdRequest());
    try {
      const supplierMaterials = await supplierMaterialService.getSupplierMaterialsByMaterialId(materialId);
      dispatch(fetchSupplierMaterialsByMaterialIdSuccess(supplierMaterials));
    } catch (error) {
      dispatch(fetchSupplierMaterialsByMaterialIdFailure(error));
    }
  };
}

export const addSupplierMaterial = (supplierId, materialId) => {
  return async (dispatch) => {
    dispatch(addSupplierMaterialRequest());
    try {
      const response = await supplierMaterialService.addSupplierMaterial(supplierId, materialId);
      dispatch(addSupplierMaterialSuccess(response.data));
    } catch (error) {
      dispatch(addSupplierMaterialFailure(error));
    }
  };
}

export const removeSupplierMaterial = (supplierId, materialId) => {
  return async (dispatch) => {
    dispatch(removeSupplierMaterialRequest());
    try {
      const removedSupplierMaterial = await supplierMaterialService.removeSupplierMaterial(supplierId, materialId);
      dispatch(removeSupplierMaterialSuccess(removedSupplierMaterial));
    } catch (error) {
      dispatch(removeSupplierMaterialFailure(error));
    }
  };
}

export default supplierMaterialsSlice.reducer;