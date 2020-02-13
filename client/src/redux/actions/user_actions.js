import axios from "axios";
import { USER_SERVER } from "../../components/utils/misc";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
} from "./types";

export function registerUser(dataToSubmit) {
    const request = axios
        .post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data)
        .catch(error => console.log("ERR", error));

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

export function loginUser(dataToSubmit) {
    const request = axios
        .post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data)
        .catch(error => console.log("ERR", error));
    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function auth() {
    const request = axios
        .get(`${USER_SERVER}/auth`, { withCredentials: true })
        .then(response => response.data)
        .catch(error => console.log("ERR", error));
    return {
        type: AUTH_USER,
        payload: request,
    };
}

export function addToCart(_id) {
    const authRequest = axios.create({ withCredentials: true }); //an instance of axios with authorization
    authRequest
        .post(`${USER_SERVER}/add_toCart?productId=${_id}`)
        .then(response => response.data)
        .catch(err => console.log("ERR", err));
    return {
        type: ADD_TO_CART,
        payload: authRequest,
    };
}
export function logoutUser() {
    const request = axios
        .get(`${USER_SERVER}/logout`, { withCredentials: true })
        .then(response => response.data)
        .catch(error => console.log("ERR", error));
    return {
        type: LOGOUT_USER,
        payload: request,
    };
}
