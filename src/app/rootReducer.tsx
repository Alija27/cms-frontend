import {combineReducers} from "@reduxjs/toolkit"
import  AuthSlice  from "./feature/Auth/AuthSlice";
import UserSlice  from "./feature/User/UserSlice";
import TeacherSlice  from "./feature/Teacher/TeacherSlice";
import DepartmentSlice from "./feature/Department/DepartmentSlice";
import SemesterSlice from "./feature/Semester/SemesterSlice";
import SubjectSlice from "./feature/Subject/SubjectSlice";
import CourseSlice from "./feature/Course/CourseSlice";
import BatchSlice from "./feature/Batch/BatchSlice";
import BookSlice from "./feature/Book/BookSlice";
import BookTransactionSlice from "./feature/BookTransaction/BookTransactionSlice";
import StudentSlice from "./feature/Student/StudentSlice";
import AccountSlice from "./feature/Account/AccountSlice";
import PaymentSlice from "./feature/Payment/PaymentSlice";
import ExamSlice from "./feature/Exam/ExamSlice";
import ResultSlice from "./feature/Result/ResultSlice";
import FinalExamReportSlice from "./feature/FinalExamReport/FinalExamReportSlice";
import SalarySlice from "./feature/Salary/SalarySlice";
import NoticeSlice from "./feature/Notice/NoticeSlice";

const rootReducer = combineReducers({
    AuthSlice:AuthSlice,
    UserSlice:UserSlice,
    TeacherSlice:TeacherSlice,
    DepartmentSlice:DepartmentSlice,
    SemesterSlice:SemesterSlice,
    SubjectSlice:SubjectSlice,
    CourseSlice:CourseSlice,
    BatchSlice:BatchSlice,
    BookSlice:BookSlice,
    BookTransactionSlice:BookTransactionSlice,
    StudentSlice:StudentSlice,
    AccountSlice:AccountSlice,
    PaymentSlice:PaymentSlice,
    ExamSlice:ExamSlice,
    ResultSlice:ResultSlice,
    FinalExamReportSlice:FinalExamReportSlice,
    SalarySlice:SalarySlice,
    NoticeSlice:NoticeSlice,

});

export default rootReducer;