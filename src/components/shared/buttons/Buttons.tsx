import React from 'react'

type ButtonProps = {
    text: string;
    type: "button" | "submit" | "reset";
    className?: string;
}
const Buttons = (props: ButtonProps) => {
    const { text, type, className } = props;
    return (
        <div>
            <button type={type} className={`bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 px-3 py-1 text-white  rounded-md dark:focus:ring-blue-800 font-medium ${className}`}>{text}</button>
            {/*         <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Blue</button>
 */}    </div>
    )
}

export default Buttons