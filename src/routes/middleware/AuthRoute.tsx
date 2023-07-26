import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
    const authState = useAppSelector((store) => store.AuthSlice)
    if (authState.current_user && authState.current_user.roles.includes("admin")) {
        return <Navigate to="/admin" />
    } else if (
        authState.current_user && authState.current_user.roles.includes("accountant")
    ) {
        return <Navigate to="/accountant" />
    }
    else if (authState.current_user && authState.current_user.roles.includes("librarian")) {
        return <Navigate to="/librarian" />
    }
    else if (
        authState.current_user && authState.current_user.roles.includes("examiner")
    ) {
        return <Navigate to="/examiner" />
    }
    else if (
        authState.current_user &&
        authState.current_user.roles.includes("teacher")
    ) {
        return <Navigate to="/teacher" />
    }
    
    else if (
        authState.current_user &&
        authState.current_user.roles.includes("student")
    ) {
        return <Navigate to="/student" />
    }

    else {
        return <Outlet />
    }

}

export default AuthRoute;