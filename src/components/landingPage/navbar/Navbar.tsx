import React from 'react'
import logo from "../../../assets/LICTlogo.png"
import { FaBars } from "react-icons/fa"
import { useState } from 'react'

type Link = {
  text: string,
  url: string,
  className?: string,
}

const Navbar = () => {

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  }

  const links: Link[] = [
    { text: "Home", url: "/" },
    { text: "About", url: "/about" },
    { text: "Contact", url: "/contact" },
    { text: "Gallery", url: "/gallery" }
  ];
  return (
    <>
      {/* <div className="absolute top-0 right-0 left-0 z-10" >
      <nav className="navbar text-center shadow lg:flex justify-between lg:p-2" >
        <div className="flex flex-row-reverse justify-between shadow-md border-b lg:border-none border-gray-200 lg:shadow-none p-2 lg:p-0">
          <span className="lg:hidden flex justify-end mt-5 mr-5 " onClick={toggleMenu}>  <FaBars />  </span>
          <span className="mx-8"><img src={logo} alt="logo"  /></span>
        </div>
        <div>
          <ul className={`bg-white  py-1 lg:flex font-semibold text-xl  transition-all duration-5000 ease-in-out px-48 lg:px-0 ${isMenuOpen ? 'block' : 'hidden'}` >
            {links.map((link, index) =>
              <a key={index} href={link.url} > <li className={`mx-5 p-2 mt-2 lg:mt-0 border-b-4 border-white  transition-colors duration-300 ease-in-out  hover:text-blue-500 hover:border-blue-500 rounded border-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:text-gradient-to-br ${link.className}`}>{link.text}</li> </a>
            )}
          </ul>
        </div>
      </nav> 
      </div>
      <div className="absolute top-20 z-0">hello</div> */}


      <div className="bg-blue-500 text-white p-2 font-bold">9845984853</div>
      <nav className="flex justify-between items-center px-8 shadow-lg border-2 border-gray-200 py-1">

        <span><img src={logo} /></span>

        <span className="flex">
          <ul className="flex space-x-8 text-center invisible lg:visible">
            {links.map((link, index) =>
              <a key={index} href={link.url} > <li className={` mt-2 lg:mt-0 border-b-4 border-white  transition-colors duration-300 ease-in-out  hover:text-blue-500 hover:border-blue-500 rounded border-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:text-gradient-to-br ${link.className}`}>{link.text}</li> </a>
            )}
          </ul>

          <span className="lg:hidden" onClick={toggleMenu}>  <FaBars />  </span>
        </span>
      </nav>
      <ul className={`  bg-white shadow-md flex flex-col absolute  w-full lg:-top-96 lg:hidden text-center  top-28  ${isMenuOpen ? "-top-96" : ""} transistion-all duration-500 ease-in-out `}>
        {links.map((link, index) =>
          <a key={index} href={link.url} > <li className={`mx-5 px-5 p-2 mt-2 lg:mt-0 border-b-4  border-white  transition-colors duration-300 ease-in-out  hover:text-blue-500 hover:border-blue-500 rounded border-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:text-gradient-to-br ${link.className}`}>{link.text}</li> </a>
        )}
      </ul>


    </>
  )
}

export default Navbar