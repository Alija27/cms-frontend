import React from 'react'

export const Modal = ({ children }: any) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-filter flex justify-center items-center   z-50 overflow-y-auto h-full" >
        <div className="py-5  w-full my-auto">
          <div className="p-5 bg-white max-w-sm mx-auto rounded-lg w-full ">
            <div className="">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const ModalHeader =({children, ...props}:any)=>{
  return(
    <div className={`text-xl font-semibold mb-2  ${props.className}`} >
      {children}
    </div>
  )
}

export const ModalBody =({children, ...props}:any)=>{
  return(
    <div className={` ${props.className}`} >
      {children}
    </div>
  )
}

export const ModalFooter =({children, ...props}:any)=>{ 
  return(
    <div className={`flex space-x-2 mt-5 ${props.className}`} >
      {children}
    </div>
  )
}
