import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import loading from "./loading";
import post from "./post";

export default combineReducers({
    alert,
    auth,
    profile,
    loading,
    post,
});
