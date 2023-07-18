import Select from "react-select"

type StateManagedSelect = {
    value: any;
    label: any;
};
type SelectProps = {
    name: string;
    required?: boolean;
    className?: string;
    register?: any;
    error?: string;
    options?: StateManagedSelect[];
    isMulti?: true;
    onChange?: any;
    defaultValue?: any;
}



export const SelectInput = (props: SelectProps) => {
    const { name, required, className, register, isMulti,  error, options, onChange , defaultValue } = props;

    const selectOptions: StateManagedSelect[] = options ? options.map((option) =>
        ({ value: option.value, label: option.label })) : [];
    return (
        <div className={`my-2 ${className}`}>
            <label htmlFor={name}>{name}</label>
            <Select className=" border-gray-200 shadow rounded-md" name={name} required={required}
                {...(register && register("name"))}
                options={selectOptions}
                isMulti={isMulti}
                onChange={onChange}
                defaultValue={defaultValue}
            />
            {error && (
                <div className="text-red-500">{error}</div>
            )}
        </div>
    )
}