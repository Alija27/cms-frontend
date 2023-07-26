import { Departments } from "../components/landingPage/pages/AdminPanel/Departments";
import Semsters from "../components/landingPage/pages/AdminPanel/Semsters";
import Teachers from "../components/landingPage/pages/AdminPanel/Teachers";
import Users from "../components/landingPage/pages/AdminPanel/Users";
import Layout from "../components/shared/dashboard/Layout";

const ExaminerRoutes = [
    {
        id: 1,
        path: "/examiner",
        component: <Layout />
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
        path: "/departments",
        component: <Departments/>
    },
    {
        id: 5,
        path: "/semesters",
        component: <Semsters/>
    },
    
    
]

export default ExaminerRoutes;