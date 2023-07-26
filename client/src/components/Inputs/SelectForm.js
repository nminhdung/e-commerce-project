import React from "react";

const SelectForm = ({
  label,
  options = [],
  register,
  errors,
  name,
  validate,
  style,
}) => {
  return (
    <div className={`flex flex-col gap-2 mb-2 ${style}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        className="text-black p-2 outline-none rounded-md"
        id={name}
        {...register(name, validate)}
      >
        <option value="">Choose</option>
        {options.map((option) => {
          return (
            <option key={option.code} value={option.code}>
              {option.value}
            </option>
          );
        })}
      </select>
      {errors[name] && (
        <small className="text-xs text-main">{errors[name]?.message}</small>
      )}
    </div>
  );
};

export default SelectForm;
