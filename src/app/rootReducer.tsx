import {combineReducers} from "@reduxjs/toolkit"
import  AuthSlice  from "./feature/Auth/AuthSlice";
import UserSlice  from "./feature/User/UserSlice";
import TeacherSlice  from "./feature/Teacher/TeacherSlice";
import DepartmentSlice from "./feature/Department/DepartmentSlice";
import SemesterSlice from "./feature/Semester/SemesterSlice";
import SubjectSlice from "./feature/Subject/SubjectSlice";
import CourseSlice from "./feature/Course/CourseSlice";
import BatchSlice from "./feature/Batch/BatchSlice";

const rootReducer = combineReducers({
    AuthSlice:AuthSlice,
    UserSlice:UserSlice,
    TeacherSlice:TeacherSlice,
    DepartmentSlice:DepartmentSlice,
    SemesterSlice:SemesterSlice,
    SubjectSlice:SubjectSlice,
    CourseSlice:CourseSlice,
    BatchSlice:BatchSlice,
});

export default rootReducer;