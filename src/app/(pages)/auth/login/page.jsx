"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../../../../lib/axios";
import { useUser } from "../../../../contexts/UserContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Zod schema for form validation
const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Username or email is required")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
        /^[a-zA-Z0-9_]{3,15}$/.test(val),
      {
        message: "Enter a valid email or username",
      }
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(15, "Password cannot exceed 15 characters"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const router = useRouter();

  const { saveUserData } = useUser();

  const onSubmit = async (data) => {
    console.log(data);
    const { identifier, password } = data;

    try {
      const response = await axiosInstance.post("/auth/login", {
        identifier,
        password,
      });

      if (response.status !== 200) {
        toast.error(response?.data?.message);
        return;
      }

      toast.success("Logged in successfully");

      saveUserData(response?.data?.user, response?.data?.token);

      router.push("/");
    } catch (error) {
      console.error("Error while login:", error);
    
      // Extracting a user-friendly error message
      const errorMessage =
        error?.response?.data?.message || // API error message
        error?.message || // General error message
        "Error while login, try again."; // Fallback message
    
      // Displaying the error message using toast
      toast.error(errorMessage);
    }
    
  };

  return (
    <div className="flex justify-center items-center custom-font h-full md:mb-16 mb-8 md:mt-16 mt-32 flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-lg gap-4 w-full rounded-xl flex-col md:px-0 px-3"
      >
        <span className="text-3xl font-normal text-[#173039]">Login</span>

        {/* Identifier Field */}
        <div className="relative w-full">
          <Controller
            name="identifier"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Email or Username"
                className={`input input-bordered w-full bg-gray-200 max-w-x placeholder-[#BCBDBF] text-gray-600 px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none ${
                  errors.identifier ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.identifier && (
            <p className="text-sm text-red-500 mt-1">
              {errors.identifier.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative w-full">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                maxLength={15}
                className={`input input-bordered w-full bg-gray-200 max-w-x placeholder-[#BCBDBF] text-gray-600 px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[50%] transform -translate-y-[50%] text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn py-2 bg-[#1B94A6] border-[#1B94A6] text-white rounded-lg border disabled:opacity-50"
        >
          Login
        </button>

        {/* Footer */}
        <div>
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href={`/auth/register`}
              className="font-normal text-primary-color hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
