import React from 'react'

const textfield = (props:any) => {
    const props={
        id,
        name,
        placeholder,
        type,
        required,

    };
  return (
<>
<input id={name} name={name} placeholder={placeholder} type={type} required={required} className="p-5 m-5" />
</>
  )
}

export default textfield