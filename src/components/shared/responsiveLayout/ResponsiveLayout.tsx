import React from 'react'
import logo from "../../../assets/LICTlogo.png"

const ResponsiveLayout = ({children}:any) => {
  return (
    <div>
        <div className="bg-white h-screen flex flex-col justify-center items-center shadow-lg">
			<div className="bg-white p-8 space-y-4 w-10/12 md:w-6/12 lg:w-4/12 rounded-lg shadow-lg border">
				<div className="flex justify-center items-center">
					<img src={logo} className=" "/>
				</div>
				<div>{children}</div>
			</div>
		</div>
    </div>
  )
}

export default ResponsiveLayout