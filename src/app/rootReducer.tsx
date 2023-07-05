import {combineReducers} from "@reduxjs/toolkit"
import  AuthSlice  from "./feature/Auth/AuthSlice";
import UserSlice  from "./feature/User/UserSlice";
import TeacherSlice  from "./feature/Teacher/TeacherSlice";
import DepartmentSlice from "./feature/Department/DepartmentSlice";
import SemesterSlice from "./feature/Semester/SemesterSlice";

const rootReducer = combineReducers({
    AuthSlice:AuthSlice,
    UserSlice:UserSlice,
    TeacherSlice:TeacherSlice,
    DepartmentSlice:DepartmentSlice,
    SemesterSlice:SemesterSlice,
});

export default rootReducer;