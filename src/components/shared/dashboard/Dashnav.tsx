import React from 'react'
import {RxHamburgerMenu} from "react-icons/rx"
import {HiOutlineUserCircle} from "react-icons/hi"
import {FcManager} from "react-icons/fc"
const Dashnav = () => {
  return (
    <>
      <div className="bg-white px-2 shadow py-3  flex justify-between mt-1">
        <div className="">
          <RxHamburgerMenu size={25}/>
        </div>
        <div>
         <FcManager size={28} className="border-2  rounded-full "/> 
        {/* <HiOutlineUserCircle size={28} className="border-2  rounded-full "/> */}
        </div>
      </div>


    </>
  )
}

export default Dashnav