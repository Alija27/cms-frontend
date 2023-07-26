import { useAppSelector } from '../../app/hooks'
import { Navigate, Outlet } from 'react-router-dom';

const AccountRoute = () => {
    const authState = useAppSelector((store) => store.AuthSlice);
    if (authState.current_user && authState.current_user.roles.includes("accountant") ) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}

export default AccountRoute;