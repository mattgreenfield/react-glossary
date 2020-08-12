import React, { FunctionComponent } from "react";

const InputText: FunctionComponent<{ label: String }> = ({ label }) => {
  return (
    <label>
      <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </div>
      <input
        type="text"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      />
    </label>
  );
};

export default InputText;
