import React from "react";

const Toggle = ({ checked, onChange, label }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-700">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600"></div>
        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-5"></span>
      </label>
    </div>
  );
};

export default Toggle;
