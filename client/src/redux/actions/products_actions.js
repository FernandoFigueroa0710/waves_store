import axios from "axios";
import { PRODUCTS_SERVER, PRODUCT_SERVER } from "../../components/utils/misc";
import {
    GET_PRODUCTS_BY_SALE,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_TO_SHOP,
    GET_BRANDS,
    ADD_BRAND,
    GET_WOODS,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
} from "./types";

export function getProductsByArrival() {
    //items?sortBy=createdAt&order=desc&limit=4
    const request = axios
        .get(`${PRODUCTS_SERVER}/items?sortBy=createdAt&order=desc&limit=4`)
        .then(response => response.data)
        .catch(err => console.log("Err", err));

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request,
    };
}

export function getProductsBySale() {
    //items?sortyBy=sold&order=desc&limit100
    const request = axios
        .get(`${PRODUCTS_SERVER}/items?sortyBy=sold&order=desc&limit=4`)
        .then(response => response.data)
        .catch(err => console.log("ERROR", err));

    return {
        type: GET_PRODUCTS_BY_SALE,
        payload: request,
    };
}

export function getProductsToShop(
    skip,
    limit,
    filters = [],
    previousState = []
) {
    const data = {
        limit,
        skip,
        filters,
    };
    const request = axios
        .post(`${PRODUCT_SERVER}/shop`, data)
        .then(response => {
            let newState = [...previousState, ...response.data.articles];
            return {
                size: response.data.size,
                articles: newState,
            };
        })
        .catch(err => console.log("ERROR", err));
    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request,
    };
}

export function addProduct(dataToSubmit) {
    const request = axios
        .post(`${PRODUCT_SERVER}/item`, dataToSubmit, { withCredentials: true })
        .then(response => response.data)
        .catch(err => console.log("ERROR", err));

    return {
        type: ADD_PRODUCT,
        payload: request,
    };
}

export function clearProduct() {
    return {
        type: CLEAR_PRODUCT,
        payload: {},
    };
}
//********************** */
//******CATEGORIES***** */
//********************** */

export function getBrands() {
    const request = axios
        .get(`${PRODUCT_SERVER}/brands`)
        .then(response => response.data)
        .catch(err => console.log("ERROR", err));
    return {
        type: GET_BRANDS,
        payload: request,
    };
}

export function addBrand(dataToSubmit, existingBrands) {
    const request = axios
        .post(`${PRODUCT_SERVER}/brand`, dataToSubmit, {
            withCredentials: true,
        })
        .then(response => {
            let brands = [...existingBrands, response.data.brand];
            return {
                sucess: response.data.sucess,
                brands,
            };
        })
        .catch(err => console.log("ERR", err));
    return {
        type: ADD_BRAND,
        payload: request,
    };
}

export function getWoods() {
    const request = axios
        .get(`${PRODUCT_SERVER}/wood`)
        .then(response => response.data)
        .catch(err => console.log("ERROR", err));
    return {
        type: GET_WOODS,
        payload: request,
    };
}
