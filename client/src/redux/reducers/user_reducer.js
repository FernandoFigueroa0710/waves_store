import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return { ...state }
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, registerSucess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload }
    default:
      return state;
  }
}
