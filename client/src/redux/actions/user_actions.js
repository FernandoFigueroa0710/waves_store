import axios from "axios";
import { USER_SERVER } from "../../components/utils/misc";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";


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

export function auth(){
  const request = axios
  .get(`${USER_SERVER}/auth`, {withCredentials: true})
  .then(response => response.data)
  .catch(error => console.log("ERR", error));
 return {
   type: AUTH_USER,
   payload: request
 }
}
