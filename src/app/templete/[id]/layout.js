import React from "react";
import NavbarTemplete from "./components/Navbar/Navbar";
import FooterTemplete from "./components/footer/Footer";

const layout = ({ children }) => {
  return (
    <div className="!bg-white h-[74vh] w-[90vw] overflow-x-hidden p-5 md:p-0 my-24 mx-auto ring-2 ring-[#1b93a62a] shadow-xl rounded-md overflow-y-scroll scrollbar-thin scrollbar-thumb-[#1B94A6] scrollbar-track-white">
      <NavbarTemplete />
      <div>{children}</div>
      <FooterTemplete />
    </div>
  );
};

export default layout;
