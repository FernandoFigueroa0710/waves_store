import axios from "axios";

import { GET_SITE_DATA, ADD_SITE_DATA } from "./types";

import { SITE_SERVER } from "../../components/utils/misc";

export function getSiteData() {
    const request = axios
        .get(`${SITE_SERVER}/site_data`)
        .then(response => response.data)
        .catch(err => console.log("Err", err));
    return {
        type: GET_SITE_DATA,
        payload: request,
    };
}

export function addSiteData() {
    return {
        type: ADD_SITE_DATA,
        payload: "",
    };
}
