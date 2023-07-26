import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { Navigate, Outlet } from 'react-router-dom';

const LibrarianRoute = () => {
    const authState = useAppSelector((store) => store.AuthSlice);
    if (authState.current_user && authState.current_user.roles.includes("librarian") ) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}

export default LibrarianRoute