import React from 'react'
import logo from '../../../assets/LICTlogo.png'
const Dashnav = () => {
  return (
    <>

      <div className=" lg:w-10/12 bg-white px-2  absolute lg:left-[16.8%] shadow py-3 w-full flex justify-end">
        <div className="rounded-full bg-blue-500 h-8 w-8 p-2 text-center text-white border-2 border-gray-200">
          <img src={logo} />
        </div>
      </div>


    </>
  )
}

export default Dashnav