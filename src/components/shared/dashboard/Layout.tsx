import React from 'react'
import Sidenav from './Sidenav'
import Dashnav from './Dashnav'
import TextFields from '../inputs/TextFields'
import Buttons from '../buttons/Buttons'
import Dashboard from './Dashboard'
import { DNavLinks, adminNavLinks } from '../../../constants/Constants'
import { useAppSelector } from '../../../app/hooks'

const Layout = ({children}:any) => {
  const authState=useAppSelector((store)=>store.AuthSlice);
  let navlinks:DNavLinks[]=[];
  navlinks=adminNavLinks;
  if(authState.current_user && authState.current_user.roles.includes("admin")){
    navlinks=adminNavLinks;
  }
  return (
    <>
      <div className="flex">
        <Sidenav navlinks={navlinks}/>
        <div className='w-full'>
          <Dashnav />
          <div className="h-[calc(100vh-60px)] p-8 text-justify overflow-y-scroll">
            {children}
          </div>
        </div>

      </div>
    </>
  )
}

export default Layout