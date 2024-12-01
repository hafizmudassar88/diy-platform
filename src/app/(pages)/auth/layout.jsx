import React from "react";
import MediaPlayer from "../../../components/shared/MediaPlayer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="lg:w-1/2 w-full">{children}</div>

      <div className="md:w-1/2 w-full hidden md:block" data-aos="fade-left">
        <MediaPlayer src={"/videos/Boy learning from online website.json"} />
      </div>
    </div>
  );
};

export default Layout;
