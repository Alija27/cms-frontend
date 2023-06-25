import React from 'react'
import Navbar from './components/landingPage/navbar/Navbar'
import Home from './components/landingPage/pages/Home'
import Sidenav from './components/shared/dashboard/Sidenav'
import Dashnav from './components/shared/dashboard/Dashnav'
import Layout from './components/shared/dashboard/Layout'
import { Table, TableActions, TableLayout,TBody,THead } from './components/shared/table/Table'
import Login from './components/landingPage/pages/Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AllRoutes from './routes/AllRoutes'


const App = () => {
  return (
    <>
    <BrowserRouter> 
    <AllRoutes/>
    </BrowserRouter>
    </>
  )
}

export default App
