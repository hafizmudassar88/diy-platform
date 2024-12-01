import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function AboutUsCard({ title = "", description = "" }) {
  return (
    <div
      data-aos="fade-right"
      className="grid grid-cols-[auto_1fr] bg-[#1B94A6] p-3 rounded-2xl font_barlow shadow-xl text-white"

    >
      <div className="">
        <IoMdCheckmarkCircleOutline className="text-5xl mx-2" />
      </div>
      <div className="">
        <h1 className="text-xl font-extrabold">{title}</h1>
        <p className="mt-2 text-lg text-opacity-85 text-justify font_barlow leading-tight">
          {description}
        </p>
      </div>
    </div>
  );
}

export default AboutUsCard;
