import Link from "next/link";
import React from "react";

const Button = ({ link, text }) => {
  return (
    <Link
      href={link}
      className="min-w-32 h-10 flex justify-center items-center bg-[#1B94A6] text-secondaryDark rounded-md font-600 text-white"
    >
      <span>{text}</span>
    </Link>
  );
};

export default Button;
