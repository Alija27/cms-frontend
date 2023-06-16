import React from 'react'
import Sidenav from './Sidenav'
import Dashnav from './Dashnav'
import TextFields from '../inputs/TextFields'
import Buttons from '../buttons/Buttons'
import Dashboard from './Dashboard'

const Layout = ({children}:any) => {
  return (
    <>
      <div className="flex">
        <Sidenav />
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