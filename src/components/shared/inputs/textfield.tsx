import React from 'react'

type TextProps = {
  label:string;
  name: string;
  placeholder: string;
  type: string;
  required: boolean;

}

const TextField = (props: TextProps) => {
  const { label,name, placeholder, type, required } = props;
  return (
    <>
      <label htmlFor={name} className="block text-gray-600 font-semibold text-xl  text-md  mb-2">{label}</label>
      <input id={name} name={name} placeholder={placeholder} type={type} required={required} className="p-4 border border-gray-200 text-gray-700 leading-tight text-xl rounded-md w-full shadow focus:bg-white focus:outline-none focus:border-blue-400" />
    </>
  )
}

export default TextField