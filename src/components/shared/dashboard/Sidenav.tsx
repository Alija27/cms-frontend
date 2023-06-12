import React from 'react'
import logo from '../../../assets/LICTlogo.png'
import { FaCaretDown } from 'react-icons/fa'
import { FaCaretRight } from 'react-icons/fa'
import { useState } from 'react'
import Dropdown from '../dropdown/Dropdown'

const Sidenav = () => {
    /* const DropdownData=[
        { text:"Alija",
         childTexts:[
            {child:"Alija",url:"/a"},
            {child:"Sandeep",url:"/s"}
        ]
},
{ text:"Sandeep",
        
         childTexts:[
            {child:"Alija",url:"/a"},
            {child:"Sandeep",url:"/s"}
        ]
},


]; */
    const [isSidenavOpen, setSidenavOpen] = useState(false);

    const SidenavToggle = () => {
        setSidenavOpen(!isSidenavOpen);
    }

    const [isMainLink1Open, setMainLink1Open] = useState(false);

    const MainLink1Toggle = () => {
        setMainLink1Open(!isMainLink1Open);
    }

    return (
        <>
            <div className="flex">
                <div className="bg-white w-2/12 shadow-lg py-2 absolute h-screen -left-[18%] lg:left-0  overflow-y-scroll main-sidebar">
                    <div className="font-bold  text-xl  p-2 shadow  text-gray-800 rounded border-b border-gray-200 flex space-x-2 justify-center ">
                         <span><img src={logo} className="h-8" /></span><span>  Dashboard </span>
                    </div>
                    {/* <div className="font-semibold text-center text-sm border-b py-1 border-gray-200 text-gray-500 rounded">
                        Welcome, Admin
                    </div> */}
                    <div className="p-2 text-gray-500 font-semibold  mr-2 pl-5 ">
                        <div className="hover:bg-blue-500 p-2 rounded hover:text-white  mt-1" >
                           <span>D</span> <span className="pl-5">Dashboard</span> 
                        </div>
                        <div className="hover:bg-blue-500 p-2 rounded hover:text-white  mt-1" >
                           <span>D</span> <span className="pl-5">Users</span> 
                        </div>
                        <div className="hover:bg-blue-500 p-2 rounded hover:text-white  mt-1" >
                           <span>D</span> <span className="pl-5">Teachers</span> 
                        </div>
                        <div className="hover:bg-blue-500 p-2 rounded hover:text-white  mt-1" >
                           <span>D</span> <span className="pl-5">Students</span> 
                        </div>
                        <div className="hover:bg-blue-500 p-2 rounded hover:text-white  mt-1" >
                           <span>D</span> <span className="pl-5">Library</span> 
                        </div>
                        
                    </div>
                </div>
                
            </div>
            
            
        </>
    )
}

export default Sidenav