import React from 'react'
import { FaEdit } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"

export const TableLayout = ({
    children,
    heading,
    rightheading

}: any) => {
    return (
        <div className="flex flex-col border text-gray-500">
            <div className='flex p-2 justify-between border-b text-gray-500'>
                <div className="font-semibold text-xl">{heading}</div>
                <div> {rightheading}</div>
            </div>
            <div className='inline-block overflow-auto'>
                {children}
            </div>
        </div>
    )
}

export const Table = ({ children }: any) => (
    <table className="min-w-full border ">{children}</table>
);

export const THead = ({ children }: any) => {
    return <thead className=" text-white ]">{children}</thead>
}
export const TBody = ({ children }: any) => {
    return <tbody className="divide-y-2 
        divide-gray-200">{children}</tbody>
}


export const TableActions = (props: any,) => {
    const { onEdit, onDelete,children } = props;

    return (
        <td className="flex space-x-4">
            {/* <div className="hover:text-blue-800"><FaEdit size={20} /></div>
            <div className="hover:text-red-800"><AiFillDelete size={20} /></div> */}
            {children}
        </td>
    );
};



