import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

function HeroSection({ bgImage, title, subtitle, height = "60vh" }) {
  return (
    <div
      className="relative bg-[#1b93a670] bg-center bg-no-repeat bg-cover mt-32 md:mt-16"
      style={{ minHeight: height }}
    >
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-[0.26] transition-all duration-300"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="relative z-10 p-10 w-full text-center">
        <h1
          data-aos="fade-down"
          className="text-white mt-32 text-2xl md:text-5xl font-bold"
        >
          {title}
        </h1>

        <div
          data-aos="fade-up"
          className="flex justify-center text-white mt-1 text-md font_barlow font-semibold text-opacity-85"
        >
          <div className="flex gap-2 items-center">
            Home
            <FaLongArrowAltRight className="text-lg text-[#1B94A6]" />
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
