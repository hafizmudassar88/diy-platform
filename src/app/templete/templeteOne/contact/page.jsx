"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form Data Submitted:", formData);
      toast.success("Message sent successfully!");

      reset(); // Clear the form
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center md:mt-16 py-5 gap-y-2">
        {/* Left Section */}
        <div className="flex flex-col lg:w-1/3 justify-center items-center mt-5">
          <p className="text-[#1B94A6] text-[32px] font-semibold">Contact Us</p>
          <p className="text-center">
            Any question or remarks? Just write us a message!
          </p>
        </div>

        {/* Middle Section - Form */}
        <div className="lg:w-1/3 md:mt-16">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded px-8 pt-6 pb-8"
          >
            {/* Name Field */}
            <div className="mb-4">
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-[#1B94A6] bg-white ring-2 ring-[#1B94A6] focus:outline-none ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-[#1B94A6] bg-white ring-2 ring-[#1B94A6] focus:outline-none ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <textarea
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-[#1B94A6] bg-white ring-2 ring-[#1B94A6] focus:outline-none ${
                  errors.message ? "border-red-500" : ""
                }`}
                placeholder="Enter your message"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="min-w-32 h-10 flex justify-center items-center bg-[#1B94A6] text-white rounded-md font-semibold hover:bg-[#167C8B] disabled:opacity-50 m-auto"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex flex-col lg:w-1/3 justify-center items-center mt-5">
          <p className="text-[#1B94A6] text-[32px] font-semibold">Contact Us</p>
          <p>info@diy.com</p>
          <p className="text-[#1B94A6] text-[32px] font-semibold mt-5">
            Address
          </p>
          <p>1234 Main Street, City, Country</p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
