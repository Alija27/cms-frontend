import { AdminHome } from '../components/landingPage/pages/AdminPanel/AdminHome';
import Users from '../components/landingPage/pages/AdminPanel/Users';
import Teachers from '../components/landingPage/pages/AdminPanel/Teachers';
import {Departments} from '../components/landingPage/pages/AdminPanel/Departments';
import Semsters from '../components/landingPage/pages/AdminPanel/Semsters';
import Subjects from '../components/landingPage/pages/AdminPanel/Subjects';
import { Courses } from '../components/landingPage/pages/AdminPanel/Courses';
import { Batches } from '../components/landingPage/pages/AdminPanel/Batches';
import { Books } from '../components/landingPage/pages/AdminPanel/Book';
import Students from '../components/landingPage/pages/AdminPanel/Student';

const AdminRoutes = [
    {
        id: 1,
        path: "/admin",
        component: <AdminHome />
    },
    {
        id: 2,
        path: "/users",
        component:<Users/>
    },
    {
        id: 3,
        path: "/teachers",
        component: <Teachers/>
    },
    {
        id: 4,
        path: "/students",
        component: <Students/>
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
    {
        id: 6,
        path: "/subjects",
        component: <Subjects/>
    },
    {
        id: 7,
        path: "/courses",
        component: <Courses/>
    },
    {
        id: 8,
        path: "/batches",
        component: <Batches/>
    },
    {
        id: 9,
        path:"/library",
        component: <Books/>
    }
]

export default AdminRoutes;