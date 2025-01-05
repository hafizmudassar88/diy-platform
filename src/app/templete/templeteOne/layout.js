import React from "react";
import NavbarTemplete from "./components/Navbar/Navbar";
import FooterTemplete from "./components/footer/Footer";

const layout = ({ children }) => {
  return (
    <>
      <NavbarTemplete />
      <div>{children}</div>
      <FooterTemplete />
    </>
  );
};

export default layout;
