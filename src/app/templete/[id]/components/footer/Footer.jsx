"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import logo from "../../../../../../public/images/logo.png";
import { navItems } from "../Navbar/components/itemLink";

function FooterTemplete() {
  return (
    <footer className=" text- py-10 bg-primaryLight ring-2 py-10">
      <div className="max-w-4xl mx-auto text-center my-10">
        <p className="mb-2 text-sm">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 gap-10">
          {navItems?.map((item, index) => {
            return (
              <Link
                className={`text-[16px] font-normal border-b-2 transition-all duration-300 ease-in-out ${"border-transparent hover:text-[#1B94A6] hover:border-[#1B94A6]"}`}
                key={index}
                href={item.url}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Built with ❤️ using Next.js and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}

export default FooterTemplete;
