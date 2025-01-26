"use client";
import { useState, useCallback } from "react";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import ToggleButtonComponent from "./components/toggleButton";
import Image from "next/image";
import { useFormContext } from "@/contexts/FormContext";
import useTemplate from "@/hooks/useTemplate";

// Reusable NavLink Component
const NavLink = ({ item, id }) => {
  const pathname = usePathname();
  const resolvedUrl = item.url.replace("[id]", id);
  const isActive = pathname === resolvedUrl;

  return (
    <Link
      href={resolvedUrl}
      className={`text-[16px] font-normal border-b-2 transition-all duration-300 ease-in-out ${
        isActive
          ? "text-primaryDark border-primaryDark"
          : "border-transparent hover:text-[#1B94A6] hover:border-[#1B94A6]"
      }`}
    >
      {item.name}
    </Link>
  );
};

const NavbarTemplete = () => {
  const pathname = usePathname();
  // const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  // const id = params?.id || "default-id";
  const { id } = useParams(); // Extract dynamic route parameter
  const { templateData, loading, error } = useTemplate(id); // Fetch template data
  const { logoImage } = templateData?.details?.home || {};

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const navItems = [
    { name: "Home", url: `/templete/${id}` },
    { name: "About Us", url: `/templete/${id}/about` },
    { name: "Contact Us", url: `/templete/${id}/contact` },
    { name: "Blogs", url: `/templete/${id}/blogs` },
    { name: "Research", url: `/templete/${id}/research` },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden pt-6 md:flex justify-around items-center h-16 bg-primaryLight z-30 text-black text-[16px]">
        <div className="">
          <Image src={logoImage} alt="ShwraLogo" width={100} height={100} />
        </div>
        <div className="flex gap-12">
          {navItems.map((item, index) => (
            <NavLink key={index} item={item} id={id} />
          ))}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between w-full px-4 py-3 bg-primaryLight z-20 text-white">
        <div>DIY</div>
        <button onClick={toggleMenu} className="text-darkBlue">
          <ToggleButtonComponent isOpen={isOpen} handleToggle={toggleMenu} />
        </button>
      </div>

      {/* Sliding Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primaryLight shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="flex items-center justify-between px-4 py-3">DIY</div>
        <div className="flex flex-col gap-10 px-4 justify-center mt-16 font-semibold">
          {navItems.map((item, index) => (
            <NavLink key={index} item={item} id={id} />
          ))}
        </div>
      </div>

      {/* Overlay for Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default NavbarTemplete;
