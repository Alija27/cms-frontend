import AllRoutes from './routes/AllRoutes'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const App = () => {
  return (
    <>
    
    <Provider store={store}>
      <AllRoutes/>
      
     <ToastContainer 
     autoClose={1000}/>
  </Provider>
    </>
  )
}

export default App
