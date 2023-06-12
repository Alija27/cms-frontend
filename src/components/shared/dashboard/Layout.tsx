import React from 'react'
import Sidenav from './Sidenav'
import Dashnav from './Dashnav'
import TextFields from '../inputs/TextFields'
import Buttons from '../buttons/Buttons'

const Layout = () => {
  return (
    <>
     <div className="">
     <Sidenav/>
     <Dashnav/>
     <div className=" h-screen ">
        <div className="bg-white absolute top-16 lg:left-[17%] h-screen lg:mx-0 w-full lg:w-10/12 z-0">
            <div className=" m-5 bg-white border text-black p-5 h-auto">
                <div className="flex justify-between p-1 m-1 border-b items-baseline">
                    <div className="text-2xl text-gray-800 font-semibold">Users</div>
                    <div className=""><Buttons type="button" text="Add New" /></div>
                </div>
           <TextFields type="text" label="Name" placeholder="Name" required={true} name="name"/>
            </div>
        </div>
     </div>
     
     </div>
    </>
  )
}

export default Layout