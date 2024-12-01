"use client";
import { toggleSidebar } from "../../../../redux/reducers/sidebar";
import React from "react";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const handleSidebar = () => {
    console.log("toggleSidebar");
    dispatch(toggleSidebar());
  };
  return (
    <>
      <div className="bg-primaryBlue my-4 h-12 flex justify-between items-center w-full rounded-lg p-8">
        <div>DIY</div>
        <h1
          className=" lg:hidden block bg-primaryBlack text-primaryRed p-2 rounded cursor-pointer"
          onClick={handleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6 text-right "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </h1>
      </div>
    </>
  );
};

export default Header;
