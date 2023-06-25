import {combineReducers} from "@reduxjs/toolkit"
import  AuthSlice  from "./feature/Auth/AuthSlice";
import UserSlice  from "./feature/User/UserSlice";

const rootReducer = combineReducers({
    AuthSlice:AuthSlice,
    UserSlice:UserSlice,
});

export default rootReducer;
