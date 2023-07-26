import { useAppSelector } from "../../app/hooks"
import { Navigate, Outlet } from "react-router-dom"
const TeacherRoutes =()=>{
    const authState = useAppSelector((store) => store.AuthSlice);
    if (authState.current_user && authState.current_user.roles.includes("teacher") ) {
        return <Outlet />
    }
    else {
        return <Navigate to="/login" />
    }
        

}
export default TeacherRoutes;

