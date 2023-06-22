import {combineReducers} from "@reduxjs/toolkit"
import  AuthSlice  from "./feature/Auth/AuthSlice";

const rootReducer = combineReducers({
    AuthSlice:AuthSlice,
});

export default rootReducer;
