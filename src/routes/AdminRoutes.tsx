import React from 'react'
import Layout from '../components/shared/dashboard/Layout';
import DataDisplay from '../components/shared/crud/DataDisplay';
import { AdminHome } from '../components/landingPage/pages/AdminPanel/AdminHome';
import Users from '../components/landingPage/pages/AdminPanel/Users';
import Teachers from '../components/landingPage/pages/AdminPanel/Teachers';
import {Departments} from '../components/landingPage/pages/AdminPanel/Departments';
import Semsters from '../components/landingPage/pages/AdminPanel/Semsters';
import Subjects from '../components/landingPage/pages/AdminPanel/Subjects';
import { Courses } from '../components/landingPage/pages/AdminPanel/Courses';

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
        path: "/departments",
        component: <Departments/>
    },
    {
        id: 5,
        path: "/semesters",
        component: <Semsters/>
    },
    {
        id: 5,
        path: "/subjects",
        component: <Subjects/>
    },
    {
        id: 6,
        path: "/courses",
        component: <Courses/>
    },
]

export default AdminRoutes;