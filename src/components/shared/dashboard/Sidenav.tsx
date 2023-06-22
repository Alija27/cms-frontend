import { NavLink } from "react-router-dom"
import logo from '../../../assets/LICTlogo.png'
import { FaCaretDown } from 'react-icons/fa'
import { FaCaretRight } from 'react-icons/fa'
import { useState } from 'react'
import Dropdown from '../dropdown/Dropdown'
import { DLinks, DNavLinks } from "../../../constants/Constants"

const Sidenav = ({ navlinks }: any) => {
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
                <div className="bg-white w-[0px] md:w-[200px] transition-all duration-300 shadow-lg py-2 h-screen overflow-y-scroll main-sidebar">
                    <div className="font-bold  text-xl  p-2 shadow  text-gray-800 rounded border-b border-gray-200 flex space-x-2 justify-center ">
                        <span><img src={logo} className="h-8" /></span><span>  Dashboard </span>
                    </div>
                    {/* <div className="font-semibold text-center text-sm border-b py-1 border-gray-200 text-gray-500 rounded">
                        Welcome, Admin
                    </div> */}

                    <div className="p-2 text-gray-500 font-semibold  mr-2 pl-5 ">
                        {navlinks.map((navlink: DNavLinks) => {
                            return (
                                <div key={navlink.section}>
                                    {navlink.links.map((link: DLinks) => {
                                        return (
                                            <>
                                            <NavLink className={`${(({isActive,}:any)=>isActive &&"bg-blue-500")}`} to={link.to}>
                                                <div className="hover:bg-blue-500 p-2 rounded hover:text-white  mt-1 flex" key={link.to} >
                                                    <span>{link.icon}</span> <span className="pl-5">{link.name}</span>
                                                </div>
                                                </NavLink>
                                            </>);
                                    })}
                                </div>);
                        })}
                    </div>
                </div>

            </div>


        </>
    )
}

export default Sidenav