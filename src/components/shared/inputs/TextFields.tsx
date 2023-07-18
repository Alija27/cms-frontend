import React from 'react'

type TextProps = {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  required?: boolean;
  className?: string;
  register?:any;
  error?: string;
}

const TextFields = (props: TextProps) => {
  const { label, name, placeholder, type, required, className,register, error } = props;

  return (
    <>
   <div className="flex flex-col gap-1">
      <label htmlFor={name} className="block text-gray-600    ">{label} {required && <span className="text-red-500">*</span>}</label>
      <input id={name} name={name} placeholder={placeholder} type={type} required={required} className={`p-2 border border-gray-300 text-gray-700 leading-tight text-md rounded-md w-full shadow focus:bg-white hover:border-1 hover:border-[#afaeae] focus:outline-none focus:border-blue-500 focus:border-2 ${className}`} {...(register && register(name))} />
      {error && (
        <div className="text-red-500">{error}</div>
      )}
      </div>
    </>
  )
}

export default TextFields