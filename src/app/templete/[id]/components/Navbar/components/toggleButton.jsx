import React from "react";

const ToggleButtonComponent = ({ handleToggle, isOpen }) => {
  return (
    <div
      onClick={handleToggle}
      className="relative flex items-center justify-center w-10 h-10 focus:outline-none"
    >
      {/* Hamburger lines */}
      <div className="flex flex-col gap-1">
        {/* Top line */}
        <div
          className={`w-8 h-1 bg-primaryLight transition-all duration-300 ease-in-out transform ${
            isOpen ? "rotate-45 translate-y-2.5" : ""
          }`}
        ></div>
        {/* Middle line */}
        <div
          className={`w-8 h-1 bg-primaryLight transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></div>
        {/* Bottom line */}
        <div
          className={`w-8 h-1 bg-primaryLight transition-all duration-300 ease-in-out transform ${
            isOpen ? "-rotate-45 -translate-y-[6px]" : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ToggleButtonComponent;
