import { NavLink, useLocation } from "react-router-dom"
import logo from '../../../assets/LICTlogo.png'
import { FaCaretDown } from 'react-icons/fa'
import { FaCaretRight } from 'react-icons/fa'
import { useState } from 'react'
import Dropdown from '../dropdown/Dropdown'
import { DLinks, DNavLinks } from "../../../constants/Constants"

const Sidenav = ({ navlinks }: any) => {
    const [isSidenavOpen, setSidenavOpen] = useState(false);
    const location = useLocation();

    const SidenavToggle = () => {
        setSidenavOpen(!isSidenavOpen);
    }

    const [isMainLink1Open, setMainLink1Open] = useState(false);

    const MainLink1Toggle = () => {
        setMainLink1Open(!isMainLink1Open);
    }

    return (
        <>
            <div className="flex border-r ">
                <div className="w-[210px] bg-white transition-all duration-300  py-2 h-screen  main-sidebar">
                    <div className="font-semibold  text-xl  p-2  shadow text-gray-800 rounded  flex space-x-4 justify-center ">
                        <span><img src={logo} className="h-8" /></span><span>  Dashboard </span>
                    </div>
                  

                    <div className="p-2 text-gray-800 font-semibold  mr-2 pl-5  ">
                        {navlinks.map((navlink: DNavLinks) => {
                            return (
                                <div key={navlink.section}>
                                    {navlink.links.map((link: DLinks) => {
                                        return (
                                            <>
                                            <NavLink 
                                            to={link.to}
                                            >
                                                <div className=" dashlink p-2 rounded hover:text-white  mt-1 flex" key={link.to} >
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