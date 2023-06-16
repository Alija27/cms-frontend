import React from 'react'
import Buttons from '../buttons/Buttons'

export const TableLayout = ({
    children,
    heading,

}: any) => {
    return (
        <div className="flex flex-col border ">
            <div className='overflow-x-auto sm:mx-6 lg:mx-8'>
                <div className='inline-block min-w-full'>
                    <div className='overflow-hidden'>
                        <div className='flex justify-between px-1 py-2 text-gray-500'>
                            <div className="font-semibold text-xl">{heading}</div>
                            <div> <Buttons type="button" text="Add new"/></div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Table =({children}:any)=>(
    <table className="min-w-full border border-separate border-gray-100">{children}</table>
    );

    export const THead=({children}:any)=>{
        return <thead className="border text-white bg-blue-500">{children}</thead>
    }
    export const TBody=({children}:any)=>{
        return <tbody className="divide-y-2 
        divide-gray-500">{children}</tbody>
    }
    

    export const TableActions = (props: any) => {
	const { onEdit, onDelete } = props;

	return (
		<td className="flex">
			<div>Edit</div>|
            <div>Delete</div>
		</td>
	);
};



