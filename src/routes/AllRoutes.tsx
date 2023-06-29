import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/landingPage/pages/Home'
import Login from '../components/landingPage/pages/Login'
import  PublicRoutes  from './PublicRoutes'
import authRoutes  from './AuthRoutes'
import AuthRoute from './middleware/AuthRoute'
import adminRoutes from './AdminRoutes'
import AdminRoute from './middleware/AdminRoute'

const AllRoutes = () => {
  return (
    <>
    <Routes>
        {PublicRoutes.map((route)=>(
            <Route 
            key={route.id}
            path={route.path}
            element={route.component}
            />
        ))}

        <Route element={<AuthRoute/>}>
        {authRoutes.map((route)=>(
            <Route
            key={route.id}
            path={route.path}
            element={route.component}
            />
        ))}
        </Route>
        <Route element={<AdminRoute/>}>
        {adminRoutes.map((route)=>(
            <Route
            key={route.id}
            path={route.path}
            element={route.component}
            />
        ))}
        </Route>
    </Routes>
   </>
  )
}

export default AllRoutes