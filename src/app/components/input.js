import React from 'react';

const CustomInput = ({ label, type, id, name, placeholder, value, onChange, labelClass }) => {
  return (
    <div className="mt-[12px]">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 shadow-sm placeholder-customDarkGray focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
        border border-[#CFCFCF] rounded-[25px]"
        
      />
    </div>
  );
};

export default CustomInput;
