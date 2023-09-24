import React from 'react'
import Sidenav from './Sidenav'
import Dashnav from './Dashnav'
import TextFields from '../inputs/TextFields'
import Buttons from '../buttons/Buttons'
import Dashboard from './Dashboard'
import { DNavLinks, accountantNavLinks, adminNavLinks, examinerNavLinks, librarianNavLinks, studentNavLinks, teacherNavLinks } from '../../../constants/Constants'
import { useAppSelector } from '../../../app/hooks' 



const Layout = ({children}:any) => {
  const authState=useAppSelector((store)=>store.AuthSlice);
  let navlinks:DNavLinks[]=[];
  console.log(authState.current_user?.roles);
  if(authState.current_user && authState.current_user.roles.includes("admin")){
    navlinks=adminNavLinks;
  }
  else if(authState.current_user && authState.current_user.roles.includes("librarian")){
    navlinks=librarianNavLinks;
  }
  else if(authState.current_user && authState.current_user.roles.includes("teacher")){
    navlinks=teacherNavLinks;
  }
  else if(authState.current_user && authState.current_user.roles.includes("accountant")){
    navlinks= accountantNavLinks;
  }
  else if(authState.current_user && authState.current_user.roles.includes("student")){
    navlinks=studentNavLinks;
  }
  else if(authState.current_user && authState.current_user.roles.includes("examiner")){
    navlinks=examinerNavLinks;
  }
  else{
    navlinks=[];
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