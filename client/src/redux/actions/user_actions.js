import axios from "axios";
import { USER_SERVER, PRODUCT_SERVER } from "../../components/utils/misc";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_USER_CART_ITEMS,
    DELETE_CART_ITEMS,
    ON_SUCCESS_BUY_USER,
    UPDATE_USER_INFO,
    CLEAR_UPDATE_USER_DATA,
} from "./types";

export function registerUser(dataToSubmit) {
    const request = axios
        .post(`${USER_SERVER}/register`, dataToSubmit)
        .then((response) => response.data)
        .catch((error) => console.log("ERR", error));

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

export function loginUser(dataToSubmit) {
    const request = axios
        .post(`${USER_SERVER}/login`, dataToSubmit)
        .then((response) => response.data)
        .catch((error) => console.log("ERR", error));
    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function auth() {
    const request = axios
        .get(`${USER_SERVER}/auth`, { withCredentials: true })
        .then((response) => response.data)
        .catch((error) => console.log("ERR", error));
    return {
        type: AUTH_USER,
        payload: request,
    };
}

export function addToCart(_id) {
    const authRequest = axios.create({ withCredentials: true }); //an instance of axios with authorization
    authRequest
        .post(`${USER_SERVER}/add_toCart?productId=${_id}`)
        .then((response) => response.data)
        .catch((err) => console.log("ERR", err));
    return {
        type: ADD_TO_CART,
        payload: authRequest,
    };
}

export function removeCartItem(id) {
    const authRequest = axios
        .get(`${USER_SERVER}/removeFromCart?_id=${id}`, {
            withCredentials: true,
        })
        .then((response) => {
            response.data.cart.forEach((item) => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantity = item.quantity;
                    }
                });
            });
            return response.data;
        })
        .catch((err) => console.log("Err", err));

    return {
        type: DELETE_CART_ITEMS,
        payload: authRequest,
    };
}

export function getCartItems(cartItems, userCart) {
    const request = axios
        .get(`${PRODUCT_SERVER}/item_by_id?id=${cartItems}&type=array`)
        .then((response) => {
            userCart.forEach((item) => {
                response.data.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data[i].quantity = item.quantity;
                    }
                });
            });
            return response.data;
        })
        .catch((err) => console.log("Cart Items error", err));
    return {
        type: GET_USER_CART_ITEMS,
        payload: request,
    };
}

export function successBuy(data) {
    const request = axios
        .post(`${USER_SERVER}/successBuy`, data, { withCredentials: true })
        .then((response) => response.data)
        .catch((err) => console.log("ERROR", err));
    return {
        type: ON_SUCCESS_BUY_USER,
        payload: request,
    };
}

export function logoutUser() {
    const request = axios
        .get(`${USER_SERVER}/logout`, { withCredentials: true })
        .then((response) => response.data)
        .catch((error) => console.log("ERR", error));
    return {
        type: LOGOUT_USER,
        payload: request,
    };
}

export function updateUserData(dataToSubmit) {
    const request = axios
        .post(`${USER_SERVER}/update_profile`, dataToSubmit, {
            withCredentials: true,
        })
        .then((response) => response.data)
        .catch((err) => console.log("ERR", err));

    return {
        type: UPDATE_USER_INFO,
        payload: request,
    };
}

export function clearUpdateUser() {
    return {
        type: CLEAR_UPDATE_USER_DATA,
        payload: "",
    };
}
