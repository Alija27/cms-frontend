import Select from "react-select"

type StateManagedSelect = {
    value: any;
    label: any;
};
type SelectProps = {
    text?: string;
    name: string;
    required?: boolean;
    className?: string;
    register?: any;
    error?: string;
    options?: StateManagedSelect[];
    isMulti?: true;
    onChange?: any;
    defaultValue?: any;
    placeholder?: string;
}



export const SelectInput = (props: SelectProps) => {
    const { name, required, className, register, isMulti,  error, options,placeholder, text, onChange , defaultValue } = props;
    
    const selectOptions: StateManagedSelect[] = options ? options.map((option) =>
        ({ value: option.value, label: option.label })) : [];
    return (
        <div className={`my-2 ${className}`}>
            <label className="text-gray-600" htmlFor={name}>{text}</label>
            <Select className=" border-gray-200 shadow rounded-md" name={name} required={required}
                {...(register && register(name))}
                options={selectOptions}
                isMulti={isMulti}
                onChange={onChange}
                defaultvalue={defaultValue}
                placeholder={placeholder}
                
            />
            {error && (
                <div className="text-red-500">{error}</div>
            )}
        </div>
    )
}