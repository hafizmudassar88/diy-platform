"use client";

import React from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineAttachEmail } from "react-icons/md";

// Dynamically import components
const HeroSection = dynamic(
  () => import("../../../components/shared/HeroSection"),
  {
    ssr: false,
  }
);

function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    reset(); // Clear the form fields after submission
  };

  return (
    <div className="bg-white overflow-x-hidden">

      {/* contact us section  */}
      <div className="w-full bg-white text-[#1B94A6] flex flex-col items-center gap-2 pb-5">
        <span className="inline-block mt-20 text-2xl uppercase border-b-4 border-[#1B94A6]">
          Contact Us
        </span>

        <p
          data-aos="fade-up"
          className="text-4xl font-extrabold text-md text-opacity-85 font_barlow text-center md:w-[35%]"
        >
          Get In Touch Today
        </p>

        <p
          data-aos="fade-up"
          className="mt-2 text-md text-opacity-85 font_barlow text-center p-2"
        >
          Get in Touch with Us for Your Website Creation Journey{" "}
        </p>
      </div>

      {/* contact details  */}
      <div className="min-h-[40vh] grid grid-cols-1 md:grid-cols-3 gap-5 m-5 md:mx-10">
        <div className="bg-[#1b93a671] flex flex-col gap-5 items-center justify-center rounded-3xl text-white p-5">
          <div className="bg-[#1B94A6] w-20 h-20 rounded-full flex items-center justify-center">
            <IoLocationOutline className="text-5xl text-white" />
          </div>

          <h1 className="text-2xl font-bold">Address</h1>
          <p
            data-aos="fade-up"
            className="mt-2 text-md text-opacity-85 font_barlow text-center "
          >
            4 Highfield Street, Ladera Ranch, London, UK SW1A 1AA
          </p>
        </div>
        <div className="bg-[#1b93a671] flex flex-col gap-5 items-center justify-center rounded-3xl text-white p-5">
          <div className="bg-[#1B94A6] w-20 h-20 rounded-full flex items-center justify-center">
            <LuPhoneCall className="text-5xl text-white" />
          </div>

          <h1 className="text-2xl font-bold">Phone Number</h1>
          <p
            data-aos="fade-up"
            className="mt-2 text-md text-opacity-85 font_barlow text-center "
          >
            +44 20 7946 0958
          </p>
        </div>
        <div className="bg-[#1b93a671] flex flex-col gap-5 items-center justify-center rounded-3xl text-white p-5">
          <div className="bg-[#1B94A6] w-20 h-20 rounded-full flex items-center justify-center">
            <MdOutlineAttachEmail className="text-5xl text-white" />
          </div>

          <h1 className="text-2xl font-bold">Our Mailbox</h1>
          <p
            data-aos="fade-up"
            className="mt-2 text-md text-opacity-85 font_barlow text-center "
          >
            diybuilders@gmail.com
          </p>
        </div>
      </div>

      {/* contact form  */}
      <div className="min-h-[80vh] rounded-3xl grid grid-cols-1 bg-white m-5 md:m-20">
        {/* left side  */}
        <div
          className=" text-[#1B94A6] rounded-3xl shadow-xl bg-[#f4f4f4] p-5 md:p-10 m-auto w-[70%]"
          data-aos="fade-right"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
                className={`mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1B94A6] focus:border-[#1B94A6] sm:text-sm ${
                  errors.name ? "border-[#1B94A6]" : ""
                }`}
              />
              {errors.name && (
                <p className="text-[#1B94A6] text-xs mt-2">Name is required</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="number"
                id="phone"
                {...register("phone", { required: true })}
                className={`mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1B94A6] focus:border-[#1B94A6] sm:text-sm ${
                  errors.phone ? "border-[#1B94A6]" : ""
                }`}
              />
              {errors.email && (
                <p className="text-[#1B94A6] text-xs mt-2">Phone is required</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className={`mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1B94A6] focus:border-[#1B94A6] sm:text-sm ${
                  errors.email ? "border-[#1B94A6]" : ""
                }`}
              />
              {errors.email && (
                <p className="text-[#1B94A6] text-xs mt-2">Email is required</p>
              )}
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                type="text"
                id="message"
                {...register("message", { required: true })}
                className={`mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1B94A6] focus:border-[#1B94A6] sm:text-sm ${
                  errors.message ? "border-[#1B94A6]" : ""
                }`}
              />
              {errors.email && (
                <p className="text-[#1B94A6] text-xs mt-2">Message is required</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1B94A6] text-white p-4 mt-10 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[#1B94A6] focus:ring-offset-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* location  */}
      <div className="w-full h-[70vh]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.880349823941!2d-0.127758!3d51.503364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c243b1dc11%3A0x75b6d3b99c575a9a!2s4%20Highfield%20Street%2C%20Ladera%20Ranch%2C%20London%2C%20UK%20SW1A%201AA!5e0!3m2!1sen!2s!4v1723824435536!5m2!1sen!2s"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactUs;
