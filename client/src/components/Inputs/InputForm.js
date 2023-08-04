import React, { useEffect, useState } from "react";

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  //   id,
  name,
  validate,
  type = "text",
  placeholder,
  fullWidth,
  defaultValue,
  style
}) => {
  return (
    <div className={`mb-2 flex flex-col gap-1 h-[78px] ${style}`}>
      {label && (
        <label htmlFor={name} className="">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        {...register(name, validate)}
        // defaultValue={defaultValue}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full outline-none p-2 rounded-md text-black"
      />
      {errors[name] && (
        <small className="text-xs text-main">{errors[name]?.message}</small>
      )}
    </div>
  );
};

export default InputForm;
