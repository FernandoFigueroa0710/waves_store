import axios from "axios";
import { PRODUCTS_SERVER, PRODUCT_SERVER } from "../../components/utils/misc";
import {
    GET_PRODUCTS_BY_SALE,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCTS_TO_SHOP,
} from "./types";
import { response } from "express";

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
    limit,
    skip,
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
            return {
                size: response.data.size,
                items: response.data.items,
            };
        })
        .catch(err => console.log("ERROR", err));
    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request,
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
