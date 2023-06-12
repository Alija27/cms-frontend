import React from 'react'

type TextProps = {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  required?: boolean;
  className?: string;
  error?: string;
}

const TextFields = (props: TextProps) => {
  const { label, name, placeholder, type, required, className, error } = props;

  return (
    <>
      <label htmlFor={name} className="block text-gray-600 font-semibold text-md  text-md  mb-2">{label}</label>
      <input id={name} name={name} placeholder={placeholder} type={type} required={required} className={`p-2 border border-gray-200 text-gray-700 leading-tight text-md rounded-md w-full shadow focus:bg-white focus:outline-none focus:border-blue-400 ${className}`} />
      {error && (
        <div className="text-red-500">{error}</div>
      )}
    </>
  )
}

export default TextFields