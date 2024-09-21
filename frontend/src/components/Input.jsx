import React from "react";

const Input = ({ label, placeholder, onChange, value, type }) => {
  return (
    <div>
      <div className="relative">
        <label
          htmlFor={label}
          className="block text-sm font-medium text-neutral-300 capitalize"
        >
          {label}
        </label>
        <input
          onChange={onChange}
          value={value}
          id={label}
          name={label}
          type={type}
          required
          className="w-full mt-1 p-2 md:p-4 bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
