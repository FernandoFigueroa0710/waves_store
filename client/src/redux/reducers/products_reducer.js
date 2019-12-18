import {
    GET_PRODUCTS_BY_SALE,
    GET_PRODUCTS_BY_ARRIVAL,
} from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case GET_PRODUCTS_BY_SALE:
            return { ...state, bySale: action.payload };
        case GET_PRODUCTS_BY_ARRIVAL:
            return { ...state, byArrival: action.payload };
        default:
            return state;
    }
}
