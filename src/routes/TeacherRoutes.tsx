import React from 'react'
import Layout from '../components/shared/dashboard/Layout'
import Users from '../components/landingPage/pages/AdminPanel/Users'
import { Books } from '../components/landingPage/pages/AdminPanel/Book'

const TeacherRoutes = [
    {
        id: 1,
        path: "/teacher",
        component:<Layout/>
    },
    {
        id: 2,
        path: "/teacher/students",
        component:<Users/>
    },
    {
        id: 2,
        path: "/teacher/library",
        component:<Books/>
    },
]

export default TeacherRoutes