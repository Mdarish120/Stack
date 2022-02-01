import { combineReducers } from "redux";
import post from "./post";
import AuthReducer from "./auth";

export default combineReducers({
    create:post,
    auth:AuthReducer
})