import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_SUCCESS,
} from './actions';

// Initial state
const initialState = {
    loading: false,
    data: [],
    error: null,
};

// Reducer
const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default categoriesReducer;