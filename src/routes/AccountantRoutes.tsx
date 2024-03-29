import { Accounts } from '../components/landingPage/pages/AdminPanel/Accounts'
import Students from '../components/landingPage/pages/AdminPanel/Student'
import Teachers from '../components/landingPage/pages/AdminPanel/Teachers'
import Users from '../components/landingPage/pages/AdminPanel/Users'
import { Payments } from '../components/landingPage/pages/AdminPanel/Payments'
import LibraryHome from '../components/landingPage/pages/LibraryPanel/LibraryHome'
import {Exams} from '../components/landingPage/pages/AdminPanel/Exams'
import { AdminHome } from '../components/landingPage/pages/AdminPanel/AdminHome'
import { Salaries } from '../components/landingPage/pages/AdminPanel/Salaries'

export const AccountantRoutes = [
    {
        id:1,
        path:"/accountant",
        component:<AdminHome/>
    },
    {
        id:2,
        path:"/accountant/users",
        component:<Users/>
    },
    {
        id:3,
        path:"/accountant/teachers",
        component:<Teachers/>
    },
    {
        id:4,
        path:"/accountant/accounts",
        component:<Accounts/>
    },
    {
        id:5,
        path:"/accountant/payments",
        component:<Payments/>
    },
    {
        id:6,
        path:"/accountant/students",
        component: <Students/>
    },
    {
        id:7,
        path:"/accountant/salaries",
        component:<Salaries/>
    },

]
export default AccountantRoutes







 