import {
    GET_PRODUCTS_BY_SALE,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_TO_SHOP,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL,
    GET_BRANDS,
    ADD_BRAND,
    GET_WOODS,
    ADD_WOOD,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
} from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case GET_PRODUCTS_TO_SHOP:
            return {
                ...state,
                toShop: action.payload.articles,
                toShopSize: action.payload.size,
            };
        case GET_PRODUCTS_BY_SALE:
            return { ...state, bySale: action.payload };
        case GET_PRODUCTS_BY_ARRIVAL:
            return { ...state, byArrival: action.payload };
        case GET_BRANDS:
            return { ...state, brands: action.payload };
        case ADD_BRAND:
            return {
                ...state,
                addBrand: action.payload.sucess,
                brands: action.payload.brands,
            };
        case GET_WOODS:
            return { ...state, woods: action.payload };
        case ADD_WOOD:
            return {
                ...state,
                addWood: action.payload.sucess,
                woods: action.payload.woods,
            };
        case ADD_PRODUCT:
            return { ...state, addProduct: action.payload };
        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload,
            };
        case CLEAR_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload,
            };
        case CLEAR_PRODUCT:
            return { ...state, addProduct: action.payload };
        default:
            return state;
    }
}
