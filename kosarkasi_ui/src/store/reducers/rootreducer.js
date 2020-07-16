import authReducer from "./authReducer";
import kosarkasiReducer from "./kosarkasiReducer";
import alertReducer from "./alertReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    auth: authReducer,
    kosarka: kosarkasiReducer, 
    alert: alertReducer
});

export default rootReducer;