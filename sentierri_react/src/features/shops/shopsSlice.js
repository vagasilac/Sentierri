import { createSlice } from '@reduxjs/toolkit';
import * as shopsService from '../../services/shopsService';

const shopsSlice = createSlice({
    name: 'shops',
    initialState: {
        loading: false,
        data: [],
        error: null,
    },
    reducers: {
        fetchShopsRequest: (state) => {
            state.loading = true;
        },
        fetchShopsSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchShopsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addShopRequest: (state) => {
            state.loading = true;
        },
        addShopSuccess: (state, action) => {
            state.loading = false;
            state.data = [...state.data, action.payload];
            state.error = null;
        },
        addShopFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateShopRequest: (state) => {
            state.loading = true;
        },
        updateShopSuccess: (state, action) => {
            state.loading = false;
            state.data = state.data.map(shop => 
                shop.id === action.payload.id ? action.payload : shop
            );
            state.error = null;
        },
        updateShopFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        shopAdded: (state, action) => {
            state.push(action.payload);
          },
    },
});

export const {
    fetchShopsRequest,
    fetchShopsSuccess,
    fetchShopsFailure,
    addShopRequest,
    addShopSuccess,
    addShopFailure,
    updateShopRequest,
    updateShopSuccess,
    updateShopFailure,
    shopAdded,
} = shopsSlice.actions;

export const fetchShops = () => {
    return async (dispatch) => {
        dispatch(fetchShopsRequest());
        try {
            const shops = await shopsService.getAllShops();
            dispatch(fetchShopsSuccess(shops));
        } catch (error) {
            dispatch(fetchShopsFailure(error));
        }
    };
}

// addShop

export const addShopAsync = (shopData) => async (dispatch) => {
    const result = await shopsService.addShop(shopData);
    if (result) {
      dispatch(shopAdded(shopData));
    }
  };


export const addShop = (shop) => {
    return async (dispatch) => {
        dispatch(addShopRequest());
        try {
            const addedShop = await shopsService.addShop(shop);
            dispatch(addShopSuccess(addedShop));
        } catch (error) {
            dispatch(addShopFailure(error));
        }
    };
}

// updateShop
export const updateShop = (shop) => {
    return async (dispatch) => {
        dispatch(updateShopRequest());
        try {
            const updatedShop = await shopsService.updateShop(shop);
            dispatch(updateShopSuccess(updatedShop));
        } catch (error) {
            dispatch(updateShopFailure(error));
        }
    };
}

export default shopsSlice.reducer;