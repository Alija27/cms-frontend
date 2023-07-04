import React, { Children } from 'react'

export const DeleteModal = ({children}:any) => {
  return (
    <>
     <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-filter flex justify-center items-center   z-50 overflow-y-auto h-full" >
        <div className="py-5  w-full my-auto">
          <div className="p-5 bg-white max-w-sm mx-auto rounded-lg w-full ">
            <div className="">
            <div className={`text-xl font-semibold mb-2`} >
                Are you sure you want to delete this?
             </div>
                <div className=""></div>
                <div className={`flex justify-center space-x-2 mt-5 `} >
               {children}
      
             </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
