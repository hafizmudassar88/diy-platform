"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import useTemplate from "@/hooks/useTemplate"; // Import the hook

function FooterTemplete() {
  const { id } = useParams();
  const { templateData, loading, error } = useTemplate(id); // Fetch template data
  const { logoImage } = templateData?.details?.home || {}; // Get the dynamic logo

  const navItems = [
    { name: "Home", url: `/templete/${id}` },
    { name: "About Us", url: `/templete/${id}/about` },
    { name: "Contact Us", url: `/templete/${id}/contact` },
    { name: "Blogs", url: `/templete/${id}/blogs` },
    { name: "Research", url: `/templete/${id}/research` },
  ];

  return (
    <footer className="">
      {/* Moving Logo Section */}
      <div className="relative overflow-hidden h-20 bg-white border-b border-[#1B94A6] flex items-center justify-center">
        <motion.div
          className="absolute bottom-0 left-0 w-full h-full flex justify-center items-center"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          {logoImage ? (
            <Image
              src={logoImage}
              alt="Footer Logo"
              width={80}
              height={80}
              priority
            />
          ) : (
            <Image
              src="/images/scholar.svg"
              alt="Default Logo"
              width={80}
              height={80}
              priority
            />
          )}
        </motion.div>
      </div>

      {/* Navigation and Footer Info */}
      <div className="max-w-4xl mx-auto text-center my-10">
        <div className="flex justify-center space-x-4 gap-10 mt-8">
          {navItems?.map((item, index) => (
            <Link
              className="text-[16px] font-normal border-b-2 transition-all duration-300 ease-in-out border-transparent hover:text-[#1B94A6] hover:border-[#1B94A6]"
              key={index}
              href={item.url}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <p className="mt-2 text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default FooterTemplete;
