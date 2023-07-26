
import Users from '../components/landingPage/pages/AdminPanel/Users'
import LibraryHome from '../components/landingPage/pages/LibraryPanel/LibraryHome'

export const AccountantRoutes = [
    {
        id:1,
        path:"/accountant",
        component:<LibraryHome/>
    },
    {
        id:2,
        path:"/accountant/users",
        component:<Users/>
    }

]
export default AccountantRoutes







 