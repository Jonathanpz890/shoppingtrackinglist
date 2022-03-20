import * as types from '../types/products';

const initialState = {
    loading: false,
    products: [],
    archivedItems: [],
}

export default function products(state = initialState, action) {
    switch (action.type) {
        case types.GET_PRODUCTS_ATTEMPT:
            return { ...state, loading: true }
        case types.GET_PRODUCTS_FAIL:
            return { ...state, loading: false }
        case types.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.data
            }
        case types.ADD_PRODUCT:
            return {
                ...state,
                loading: false,
                products: [action.payload.data, ...state.products].sort((a, b) => a.date - b.date)

            }
        case types.ARCHIVE_PRODUCT:
            const newProducts = [...state.products];
            const archivedItem = newProducts.splice(state.products.findIndex(product => product.id === action.payload.id), 1);
            return {
                ...state,
                loading: false,
                products: newProducts,
                archivedItems: [archivedItem[0], ...state.archivedItems]
            }
        case types.UNARCHIVE_PRODUCT:
            const newArchivedItems = [...state.archivedItems];
            const unarchivedItem = newArchivedItems.splice(state.archivedItems.findIndex(product => product.id === action.payload.id), 1);
            return {
                ...state,
                loading: false,
                products: [unarchivedItem[0], ...state.products].sort((a, b) => a.date - b.date),
                archivedItems: newArchivedItems
            }
        default:
            return state;
    }
}