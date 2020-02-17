import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_USER_CART_ITEMS,
    DELETE_CART_ITEMS,
} from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case LOGOUT_USER:
            return { ...state };
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };
        case REGISTER_USER:
            return { ...state, registerSucess: action.payload };
        case AUTH_USER:
            return { ...state, userData: action.payload };
        case ADD_TO_CART:
            return {
                ...state,
                userData: { ...state.userData, cart: action.payload },
            };
        case GET_USER_CART_ITEMS:
            return { ...state, cartDetail: action.payload };
        case DELETE_CART_ITEMS:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart,
                },
            };
        default:
            return state;
    }
}
