import LibraryHome from '../components/landingPage/pages/LibraryPanel/LibraryHome'
import { Books } from '../components/landingPage/pages/AdminPanel/Book'

export const LibrarianRoutes = [
    {
        id:1,
        path:"/librarian",
        component:<LibraryHome/>
    },
    {
        id:2,
        path:"/librarian/books",
        component:<Books/>
    },
    {
        id:3,
        path:"/librarian/book-transactions",
        component:<Books/>
    },
]

export default LibrarianRoutes