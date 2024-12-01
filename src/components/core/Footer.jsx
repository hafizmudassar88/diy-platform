"use client";
import Link from "next/link";
import React from "react";
import { MdOutlinePhoneInTalk, MdOutlineMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { CiFacebook } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import { motion } from "framer-motion";
import FaCarSide from "../../../public/images/diy.svg";

function Footer() {
  return (
    <>
      <footer className="footer bg-white text-base-content p-10 md:grid md:grid-cols-4 font_barlow pt-20">
        <aside data-aos="fade-up">
          <div className="flex-shrink-0">
            <Link href="/">
              <img
                src="/images/diy.svg" // Update with your logo path
                alt="Company Logo"
                className="h-24 w-24" // Set height and width
              />
            </Link>
          </div>

          <p className="text-justify">
            Thank you for choosing us to create your online presence. Our
            mission is to make website creation simple, accessible, and free for
            everyone. If you have any questions or need assistance, feel free to
            contact us. Let’s build something amazing together!our clients
            maintain their vehicles’ appearance and overall condition. With
            years of experience in the industry, our team is dedicated to
            providing top-notch auto detailing services to help you keep your
            car looking like new.
          </p>

          {/* social media link  */}
          <div className="flex justify-center items-center gap-x-2 ">
            <Link href={"/"}>
              <CiFacebook className="text-[2rem] text-black-500 hover:scale-110 hover:font-semibold transition-all" />
            </Link>
            <Link href={"/"}>
              <IoLogoInstagram className="text-3xl text-black-500 hover:scale-110 hover:font-semibold transition-all" />
            </Link>
            <Link href={"/"}>
              <AiOutlineYoutube className="text-4xl text-black-500 hover:scale-110 hover:font-semibold transition-all" />
            </Link>
          </div>
        </aside>
        <nav className="md:ms-10" data-aos="fade-up">
          <h6 className="footer-title text-[#1B94A6]">Quick Links</h6>
          <Link
            href={"/"}
            className="text-decoration-none hover:text-[#1B94A6] hover:font-semibold"
          >
            Home
          </Link>
          <Link
            href={"/about-us"}
            className="text-decoration-none hover:text-[#1B94A6] hover:font-semibold"
          >
            About Us
          </Link>
          <Link
            href={"/"}
            className="text-decoration-none hover:text-[#1B94A6] hover:font-semibold"
          >
            Services
          </Link>
          <Link
            href={"/gallery"}
            className="text-decoration-none hover:text-[#1B94A6] hover:font-semibold"
          >
            Gallery
          </Link>
          <Link
            href={"/contact-us"}
            className="text-decoration-none hover:text-[#1B94A6] hover:font-semibold"
          >
            Contact Us
          </Link>
          <Link
            href={"/booking"}
            className="text-decoration-none hover:text-[#1B94A6] hover:font-semibold"
          >
            Sign Up
          </Link>
        </nav>
        <nav data-aos="fade-up">
          <h6 className="footer-title text-[#1B94A6]">Services</h6>
          <Link
            // href={"/customizable-template"}
            href={"/"}
            className="text-decoration-none hover:text-[#1B94A6] hover:font-semibold"
          >
            Customizable Templates
          </Link>
          <Link
            href={"/"}
            // href={"/content-management-service"}
            className="text-decoration-none hover:text-[#1B94A6] hover:font-semibold"
          >
            CMS for Dynamic Content Management
          </Link>
          <Link
            href={"/"}
            // href={"/hosting-publishing"}
            className="text-decoration-none hover:text-[#1B94A6] hover:font-semibold"
          >
            Free Hosting and Publishing
          </Link>
        </nav>
        <nav data-aos="fade-up">
          <h6 className="footer-title text-[#1B94A6]">Contact Us</h6>
          <div className="cursor-pointer">
            <div className="flex gap-x-2 items-center">
              <MdOutlinePhoneInTalk className="text-lg" />
              <p>+44 20 7946 0958</p>
            </div>
          </div>
          <div className="cursor-pointer">
            <div className="flex gap-x-2 items-center">
              <MdOutlineMailOutline className="text-lg" />
              <p>diybuilders@gmail.com</p>
            </div>
          </div>
          <div className="cursor-pointer">
            <div className="flex gap-x-2 items-center">
              <IoLocationOutline className="text-3xl" />
              <p>
                4 Highfield Street, Ladera Ranch, London, UK SW1A 1AAty, CA
                92694, United States
              </p>
            </div>
          </div>
          <nav className="mt-3">
            <div className="cursor-pointer">
              <div className="flex gap-x-2 items-center">
                <IoLocationOutline className="text-lg" />
                <p>Highfield Street</p>
              </div>
            </div>
          </nav>
        </nav>
      </footer>

      <div className="relative mt-18 overflow-hidden h-20 bg-white border-b border-[#1B94A6]">
        <motion.div
          className="absolute bottom-0 left-0 w-full h-full flex justify-center items-center"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <img
            src="/images/diy.svg" // Update the path if necessary
            alt="Company Logo"
            className="h-20 w-auto" // Adjust height and width as needed
          />
        </motion.div>
      </div>

      <footer
        className="footer bg-[white] flex flex-col p-5"
      >
        <p className="text-center text-[#1B94A6]">
          Copyright © 2023, DIY Builders. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

export default Footer;
