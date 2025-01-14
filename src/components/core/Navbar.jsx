"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useUser } from "../../contexts/UserContext";
import { Button } from "../ui/button";

const servicesMenu = [
  { title: "Customizable Templates", url: "/customizable-template" },
  {
    title: "CMS for Dynamic Content Management",
    url: "/content-management-service",
  },

  { title: "Free Hosting and Publishing", url: "/hosting-publishing" },
];

function Navbar() {
  const [isServicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const servicesButtonRef = useRef(null);
  const { isAuthenticated, removeUserData } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !servicesButtonRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    removeUserData();

    router.push("/auth/login");
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div className="navbar bg-[white] font_barlow p-10 flex justify-between max-h-[4vh] max-w-[80vw] rounded-3xl fixed top-1 left-0 right-0 mx-auto z-50 mt-5 ring-2 ring-[#1b93a657] shadow-2xl">
      {/* Navbar start */}
      <div className="navbar-start">
        {/* small screens navbar */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="/images/diy.svg"
              className="h-5 w-5 text-[#1B94A6]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box mt-3 w-52 p-2 shadow text-[#1B94A6] !bg-white z-100"
          >
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link href={"/templete"} className="me-1 w-full">
                  Templates
                </Link>
              </li>
            )}
            <li>
              <Link href={"/about-us"}>About Us</Link>
            </li>
            <li>
              <div className="dropdown">
                <button
                  ref={servicesButtonRef}
                  onClick={() => setServicesOpen(!isServicesOpen)}
                  className="flex justify-between w-full"
                >
                  Services
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#1B94A6] !important ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isServicesOpen && (
                  <ul
                    ref={dropdownRef}
                    className="p-2 mt-2 rounded-box shadow z-40 absolute top-4 left-[-.6rem]"
                  >
                    {servicesMenu.map((service) => (
                      <li key={service.title}>
                        <Link href={service.url}>{service.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>

            <li>
              <Link href={"/contact-us"}>Contact Us</Link>
            </li>
            <li>
              {isAuthenticated ? (
                <Button onClick={handleLogout} variant="destructive">
                  Logout
                </Button>
              ) : (
                <Button
                  href={"/auth/register"}
                  onClick={handleLogin}
                  className="bg-[#1B94A6] text-white hover:bg-[#1b93a6da]"
                >
                  Signin
                </Button>
              )}
            </li>
          </ul>
        </div>

        <div className="flex-shrink-0 p-2 hidden lg:block">
          <Link href={"/"}>
            <img
              src="/images/diy.svg" // logo path
              alt="Company Logo"
              className="ms-4 md:ms-0 h-8 md:h-12 w-20 md:w-32" // Set height and width
            />
          </Link>
        </div>
      </div>

      <div className="flex-shrink-0 p-2 block lg:hidden">
        <Link href={"/"}>
          <img
            src="/images/diy.svg" // logo path
            alt="Company Logo"
            className="ms-4 md:ms-0 h-8 md:h-12 w-20 md:w-32" // Set height and width
          />
        </Link>
      </div>

      {/* Navbar middle part */}
      <div className="navbar-center hidden lg:flex font-semibold">
        <ul className="menu menu-horizontal px-1 text-[#1B94A6] !important">
          <li className="m-1">
            <Link href={"/"} className="me-1 w-full">
              Home
            </Link>
          </li>

          {isAuthenticated && (
            <li className="m-1">
              <Link href={"/templete"} className="me-1 w-full">
                Templates
              </Link>
            </li>
          )}

          <li className="m-1 relative group">
            <Link href={"/services"} className="w-full">
              Services
            </Link>
            <ul className="absolute bg-white border-0 top-7 left-[-5rem] p-2 w-[15rem] rounded-box shadow mt-2 hidden group-hover:block z-20">
              {servicesMenu.map((service) => (
                <li key={service.title}>
                  <Link href={service.url} className="w-full">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="m-1">
            <Link href={"/about-us"} className="w-full">
              About Us
            </Link>
          </li>
          <li className="m-1">
            <Link href={"/contact-us"} className="w-full">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar end */}
      <div className="navbar-end hidden lg:flex lg:justify-end">
        {isAuthenticated ? (
          <Button
            onClick={handleLogout}
            variant="destructive"
            // className="btn bg-[#1B94A6] !important] text-white hover:bg-[#1B94A6] hover:scale-110"
          >
            Logout
          </Button>
        ) : (
          <Button
            href={"/auth/register"}
            onClick={handleLogin}
            className="bg-[#1B94A6] text-white hover:bg-[#1b93a6da]"
          >
            Signin
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
