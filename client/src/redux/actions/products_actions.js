import axios from "axios";
import { PRODUCT_SERVER } from "../../components/utils/misc";
import { GET_PRODUCTS_BY_SALE, GET_PRODUCTS_BY_ARRIVAL } from "./types";

export function getProductsByArrival() {
    //items?sortBy=createdAt&order=desc&limit=4
    const request = axios
        .get(`${PRODUCT_SERVER}/items?sortBy=createdAt&order=desc&limit=4`)
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
        .get(`${PRODUCT_SERVER}/items?sortyBy=sold&order=desc&limit=4`)
        .then(response => response.data)
        .catch(err => console.log("ERROR", err));

    return {
        type: GET_PRODUCTS_BY_SALE,
        payload: request,
    };
}
