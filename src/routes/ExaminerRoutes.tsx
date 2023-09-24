import { Departments } from "../components/landingPage/pages/AdminPanel/Departments";
import { Exams } from "../components/landingPage/pages/AdminPanel/Exams";
import FinalExamReport from "../components/landingPage/pages/AdminPanel/FinalExamReport";
import { Results } from "../components/landingPage/pages/AdminPanel/Result";
import Semsters from "../components/landingPage/pages/AdminPanel/Semsters";
import Students from "../components/landingPage/pages/AdminPanel/Student";
import Teachers from "../components/landingPage/pages/AdminPanel/Teachers";
import Users from "../components/landingPage/pages/AdminPanel/Users";
import Layout from "../components/shared/dashboard/Layout";
import {AdminHome} from "../components/landingPage/pages/AdminPanel/AdminHome";

const ExaminerRoutes = [
    {
        id: 1,
        path: "/examiner",
        component: <AdminHome />
    },
    {
        id: 2,
        path: "/examiner/users",
        component:<Users/>
    },
    {
        id: 3,
        path: "/examiner/teachers",
        component: <Teachers/>
    },
    {
        id: 4,
        path: "/examiner/students",
        component: <Students/>
    },
    {
        id: 5,
        path: "/examiner/exams",
        component: <Exams/>
    },
    {
        id: 6,
        path: "/examiner/results",
        component: <Results/>
    },
    {
        id: 7,
        path: "/examiner/final-exam-reports",
        component: <FinalExamReport/>
    },

    
    
]

export default ExaminerRoutes;