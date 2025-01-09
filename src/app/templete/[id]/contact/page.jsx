"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import useTemplate from "@/hooks/useTemplate";
import LoadingSkeleton from "./LoadingSkeleton"; // Custom loading skeleton
import ErrorMessage from "../components/ErrorMessage";

const ContactPage = () => {
  const { id } = useParams(); // Extract dynamic route parameter
  const { templateData, loading, error } = useTemplate(id); // Fetch template data

  // Destructure contact details with fallback values
  const { email, address } = templateData?.details?.contact || {
    email: "",
    address: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form Data Submitted:", formData);
      toast.success("Message sent successfully!");

      reset(); // Clear the form
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  // Show loading skeleton while data is being fetched
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Show error message if there's an error
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="flex flex-col items-center md:mt-16 py-5 gap-y-2">
      {/* Left Section */}
      <div className="flex flex-col lg:w-1/3 justify-center items-center mt-5">
        <h2 className="text-[#1B94A6] text-3xl font-semibold">Contact Us</h2>
        <p className="text-center text-gray-600">
          Any questions or remarks? Just write us a message!
        </p>
      </div>

      {/* Middle Section - Form */}
      <div className="lg:w-1/3 md:mt-16 w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          // className="rounded-lg bg-white shadow-lg px-8 pt-6 pb-8"
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
              className={`w-full py-2 px-3 text-[#1B94A6] bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B94A6] ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
              className={`w-full py-2 px-3 text-[#1B94A6] bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B94A6] ${
                errors.email ? "border-red-500" : "border-gray-300"
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
          <div className="mb-6">
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
              className={`w-full py-2 px-3 text-[#1B94A6] bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B94A6] ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your message"
              rows={4}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-w-32 h-10 flex justify-center items-center bg-[#1B94A6] text-white rounded-md font-semibold hover:bg-[#167C8B] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex flex-col lg:w-1/3 justify-center items-center mt-5">
        <h2 className="text-[#1B94A6] text-3xl font-semibold">Contact Info</h2>
        <p className="text-gray-600">{email}</p>
        <h2 className="text-[#1B94A6] text-3xl font-semibold mt-5">Address</h2>
        <p className="text-gray-600">{address}</p>
      </div>
    </div>
  );
};

export default ContactPage;
