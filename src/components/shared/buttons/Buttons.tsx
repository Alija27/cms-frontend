import React from 'react'

type ButtonProps = {
    text: string;
    type: "button" | "submit" | "reset";
    className?: string;
    onClick?:()=>void;
}
const Buttons = (props: ButtonProps) => {
    const { text, type, className,onClick } = props;
    return (
        <div>
            <button type={type}  onClick={onClick} className={` from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:outline-none focus:ring-green-300 px-4 py-1 text-white  rounded-md dark:focus:ring-blue-800 font-medium ${className} `}>{text}</button>
            {/*         <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Blue</button>
 */}    </div>
    )
}

export default Buttons