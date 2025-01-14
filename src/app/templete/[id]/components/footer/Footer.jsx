"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

function FooterTemplete() {

  const params = useParams();

  const id = params?.id || "default-id";

  const navItems = [
    { name: "Home", url: `/templete/${id}` },
    { name: "About Us", url: `/templete/${id}/about` },
    { name: "Contact Us", url: `/templete/${id}/contact` },
    { name: "Blogs", url: `/templete/${id}/blogs` },
    { name: "Research", url: `/templete/${id}/research` },
  ];
  return (
    <footer className="py-10 bg-primaryLight ring-2">
      <div className="max-w-4xl mx-auto text-center my-10">
        <p className="mb-2 text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </p>
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
      </div>
    </footer>
  );
}

export default FooterTemplete;
