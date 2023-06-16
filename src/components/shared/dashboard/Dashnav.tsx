import React from 'react'
import logo from '../../../assets/LICTlogo.png'
const Dashnav = () => {
  return (
    <>
      <div className="bg-white px-2 shadow py-3 w-full flex justify-between">
        <div>
Menu
        </div>
        <div className="rounded-full bg-blue-500 h-8 w-8 p-2 text-center text-white border-2 border-gray-200">
          <img src={logo} />
        </div>
      </div>


    </>
  )
}

export default Dashnav