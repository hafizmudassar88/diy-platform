"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { navItems } from "../Navbar/components/itemLink";

function FooterTemplete() {
  return (
    <footer className="">
      {/* Moving Logo Section */}
      <div className="relative overflow-hidden h-20 bg-white border-b border-[#1B94A6]">
        <motion.div
          className="absolute bottom-0 left-0 w-full h-full flex justify-center items-center"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Image
            src="/images/scholar.svg"
            alt="Scholar Logo"
            width={80}
            height={80}
            priority
          />
        </motion.div>
      </div>

      {/* Navigation and Footer Info */}
      <div className="max-w-4xl mx-auto text-center my-10">
        <div className="flex justify-center space-x-4 gap-10 mt-8">
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
        <p className="mt-2 text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default FooterTemplete;
