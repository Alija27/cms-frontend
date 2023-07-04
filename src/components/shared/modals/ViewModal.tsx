import React from 'react'
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';

type ModalProps = {
    children: any,
    className?: string,
    onClick?:()=>void;
   
    
}


export const ViewModal = (props:ModalProps) => {
   


    const {children,className,onClick} = props;
   
  return (<>
  
      <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-filter flex justify-center items-center   z-50 overflow-y-auto h-full" >
        <div className="py-5  w-full my-auto">
          <div className="p-5 bg-white max-w-sm mx-auto rounded-lg w-full ">
            <div className={`${className}`}>
              {children} 
            </div>
          </div>
        </div>
      </div>
      
  </>
  )
}


export const HeaderModal =({children, ...props}:any)=>{
    return(
        <div className={`flex justify-between   ${props.className}`} >
              <span className="mt-1 text-xl font-bold">{props.heading}</span>
        {children}
        </div>
    )
    }