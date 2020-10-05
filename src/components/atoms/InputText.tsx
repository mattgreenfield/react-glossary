import React, { FunctionComponent } from "react";

const InputText: FunctionComponent<{
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, onChange }) => {
  return (
    <label>
      <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
        {label}
      </div>
      <input
        type="text"
        className="appearance-none block w-full text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-700"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default InputText;
