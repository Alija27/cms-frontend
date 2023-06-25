import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
    const authState=useAppSelector((store)=>store.AuthSlice)
    if(
        authState.current_user &&
        authState.current_user.roles.includes("admin")
    ){
        return <Navigate to="/admin"/>
    }else if(
        authState.current_user &&
        authState.current_user.roles.includes("accountant")
    ){
     return <Navigate to="/accountant"/>   
    }
    else{
        return <Outlet/>
    }
  
}

export default AuthRoute;