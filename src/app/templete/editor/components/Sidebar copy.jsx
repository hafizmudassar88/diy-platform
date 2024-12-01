"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function PrimarySidebar() {
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const NavabrData = [
    {
      label: "Home",
      path: "/home",
      components: [
        { name: "Hero", link: "/templete/editor/Home/Hero" },
        { name: "About", link: "/templete/editor/Home/About" },
        { name: "Contact", link: "/templete/editor/Home/Contact" },
        { name: "Footer", link: "/" },
      ],
    },
    {
      label: "About",
      path: "/about",
      components: [
        { name: "hero", link: "/" },
        { name: "about", link: "/" },
        { name: "footer", link: "/" },
      ],
    },
    {
      label: "Contact",
      path: "/contact",
      components: [
        { name: "hero", link: "/" },
        { name: "about", link: "/" },
        { name: "footer", link: "/" },
      ],
    },
  ];

  const handleLabelClick = (label) => {
    setSelectedLabel((prevLabel) => (prevLabel === label ? null : label));
  };

  const renderComponents = (components) => {
    return components.map((component, index) => (
      <ul key={index}>
        <li className="list-disc ms-5">
          <a href={component.link}>{component.name}</a>
        </li>
      </ul>
    ));
  };

  return (
    <div
      className={`aboslute lg:translate-x-0 top-0 left-0 z-50  overflow-hidden
        h-[100vh] w-80 bg-primaryBlue custom-font text-primaryBlack
        transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:flex flex-col pt-10 gap-8 p-4`}
    >
      <div className="flex flex-col gap-8 flex-1">
        {NavabrData?.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => handleLabelClick(item.label)}
              className="flex flex-row gap-16 bg-white py-2 px-2 rounded-md justify-between"
            >
              <div className="cursor-pointer  text-[16px] font-semibold">
                {item.label}
              </div>
              <p className="mt-1">
                {selectedLabel === item.label ? (
                  <svg
                    className="w-4 h-4 transition-transform duration-300 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 transition-transform duration-300 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </p>
            </div>
            {/* Add animation for expanding/collapsing components */}
            <div
              className={`flex flex-col gap-3 bg-white p-3 rounded-md  mt-3 transition-all duration-800 text-primaryBlue ease-in-out ${
                selectedLabel === item.label
                  ? "max-h-auto opacity-100" // Fully expanded
                  : "max-h-0 opacity-0 overflow-hidden" // Collapsed
              }`}
            >
              {selectedLabel === item.label &&
                renderComponents(item.components)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
