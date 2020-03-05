import { combineReducers } from "redux";
import user from "./user_reducer";
import products from "./products_reducer";
import siteNfo from "./site_reducer";

const rootReducer = combineReducers({
    user,
    products,
    siteNfo,
});

export default rootReducer;
