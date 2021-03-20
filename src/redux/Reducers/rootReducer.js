import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    auth: authReducer,
    user: userReducer
})

export default rootReducer;