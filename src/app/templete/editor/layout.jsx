import React from "react";
import PrimarySidebar from "./components/Sidebar";
import Header from "./components/Header";

const Layout = ({ children }) => {
  return (
    <div className="bg-white h-[75vh] w-[90vw] overflow-x-hidden p-5 md:p-0 mt-10 md:mt-24 mx-auto ring-2 ring-[#1b93a62a] shadow-xl rounded-md overflow-y-scroll scrollbar-thin scrollbar-thumb-[#1B94A6] scrollbar-track-white">
      <div className="flex">
        {/* Sidebar */}
        <PrimarySidebar />

        {/* Content Wrapper */}
        <div className="flex flex-col bg-white w-full p-0 md:p-5">
          <Header />
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
