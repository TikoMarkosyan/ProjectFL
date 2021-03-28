import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import hallFoodReducer from "./hallFoodReducer";

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    auth: authReducer,
    user: userReducer,
    hallFoodReducer: hallFoodReducer
})

export default rootReducer;