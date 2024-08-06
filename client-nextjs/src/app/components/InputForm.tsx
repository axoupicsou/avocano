import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const InputForm = ({
  text = "",
  registerOption,
  register,
  errors,
  required = false,
}: {
  text?: string;
  registerOption: any;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  required?: boolean;
}) => {
  return (
    <div className="mt-4">
      <label className="block" htmlFor="description">
        {registerOption}
      </label>
      <input
        type="text"
        placeholder={text}
        defaultValue={text}
        {...register(registerOption, { required: required })}
        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
      />
      {errors.description && (
        <span className="text-xs text-red-600">
          {registerOption} is required
        </span>
      )}
    </div>
  );
};

export default InputForm;
