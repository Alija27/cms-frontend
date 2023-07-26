import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/landingPage/pages/Home'
import Login from '../components/landingPage/pages/Login'
import  PublicRoutes  from './PublicRoutes'
import authRoutes  from './AuthRoutes'
import AuthRoute from './middleware/AuthRoute'
import adminRoutes from './AdminRoutes'
import AdminRoute from './middleware/AdminRoute'

import { getuser } from '../app/feature/Auth/AuthApi'
import { useAppDispatch } from '../app/hooks'
import { useAppSelector } from '../app/hooks'
import { useEffect } from 'react'
import LibrarianRoute from './middleware/LibrarianRoute'
import librarianRoutes from './LibrarianRoutes'
import TeacherRoute from './middleware/TeacherRoute'
import teacherRoutes from './TeacherRoutes'
import AccountRoute from './middleware/AccountRoute'
import accountantRoutes from './AccountantRoutes'
import ExaminerRoute from './middleware/ExaminerRoute'
import examinerRoutes from './ExaminerRoutes'
import StudentRoute from './middleware/StudentRoute'
import studentRoutes from './StudentRoutes'



const AllRoutes = () => {
    const dispatch= useAppDispatch();
    const authState = useAppSelector((store) => store.AuthSlice);
    useEffect(() => {
        dispatch(getuser());
    }, [dispatch]);
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



        <Route  element={<LibrarianRoute/>}>
        {librarianRoutes.map((route)=>(
            <Route
            key={route.id}
            path={route.path}
            element={route.component}
            />
        ))}
        </Route>

        <Route element={<TeacherRoute/>}>
        {teacherRoutes.map((route)=>(
            <Route
            
            key={route.id}
            path={route.path}
            element={route.component}
            />
        ))}
        </Route>

         <Route element={<AccountRoute/>}>
        {accountantRoutes.map((route)=>(
            <Route
            key={route.id}
            path={route.path}
            element={route.component}
            />
        ))}
        </Route>
        <Route element={<ExaminerRoute/>}>
        {examinerRoutes.map((route)=>(
            <Route
            key={route.id}
            path={route.path}
            element={route.component}
            />
        ))}
        </Route>
        <Route element={<StudentRoute/>}>
        {studentRoutes.map((route)=>(
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