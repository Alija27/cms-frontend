import LibraryHome from '../components/landingPage/pages/LibraryPanel/LibraryHome'
import { Books } from '../components/landingPage/pages/AdminPanel/Book'
import BookTransaction from '../components/landingPage/pages/AdminPanel/BookTransaction'

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
        component:<BookTransaction/>
    },
]

export default LibrarianRoutes