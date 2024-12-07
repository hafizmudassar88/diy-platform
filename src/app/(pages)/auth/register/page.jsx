"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import axiosInstance from "../../../../lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Validation schema using Zod
const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(50, "Name is too long"),
    username: z
      .string()
      .min(1, "Username is required")
      .max(30, "Username is too long"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const { name, username, email, password } = data;

    try {
      const response = await axiosInstance.post("/auth/signup", {
        name,
        username,
        email,
        password,
      });

      if (response.status !== 200) {
        console.log("error: " + response.data.message);

        toast.error(response?.data?.message);
        return;
      }

      toast.success("Registered successfully");

      reset();
      router.push("/login");
    } catch (error) {
      console.error("Error while signup:", error);

      // Safely access the error message
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";

      // Display the error using toast
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center custom-font h-[90vh] md:mb-16 mb-8 md:mt-16 mt-32 flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-lg gap-4 w-full rounded-xl flex-col md:px-0 px-3"
      >
        <span className="text-3xl font-normal text-[#173039]">Sign Up</span>

        {/* Name Field */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full bg-gray-200 max-w-x placeholder-[#BCBDBF] text-gray-600 px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Username Field */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full bg-gray-200 max-w-x placeholder-[#BCBDBF] text-gray-600 px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="relative w-full">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full bg-gray-200 max-w-x placeholder-[#BCBDBF] text-gray-600 px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered font-normal bg-gray-200 text-gray-600 w-full max-w-x placeholder-[#BCBDBF] px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none"
            {...register("password")}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {/* Eye Icon */}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="input input-bordered font-normal bg-gray-200 text-gray-600 w-full max-w-x placeholder-[#BCBDBF] px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none"
            {...register("confirmPassword")}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {/* Eye Icon */}
          </span>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn py-2 bg-[#1B94A6] border-[#1B94A6] text-white rounded-lg border"
        >
          Sign Up
        </button>

        <div className="mt-2">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href={`/auth/login`}
              className="font-normal text-primary-color hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
