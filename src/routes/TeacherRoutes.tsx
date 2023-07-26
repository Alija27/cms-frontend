import React from 'react'
import Layout from '../components/shared/dashboard/Layout'
import Users from '../components/landingPage/pages/AdminPanel/Users'

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
]

export default TeacherRoutes