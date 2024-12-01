"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Login() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    const passwordsMatch = data.password === data.confirmPassword;
    const isFormValid =
      emailValid && data.password.length > 0 && passwordsMatch;
    setIsButtonDisabled(!isFormValid);
  }, [data.email, data.password, data.confirmPassword]);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="flex justify-center items-center custom-font h-[90vh] md:mb-16 mb-8 md:mt-16 mt-32 flex-col">
      <form className="flex max-w-lg gap-4 w-full rounded-xl flex-col md:px-0 px-3">
        <span className="text-3xl font-normal text-[#173039]">Sign Up</span>

        <div className="relative w-full">
          <input
            type="text"
            name="fname"
            value={data.fname}
            onChange={handleChange}
            placeholder="First Name"
            className="input input-bordered w-full bg-gray-200 max-w-x placeholder-[#BCBDBF] text-gray-600 px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none"
            required
          />
        </div>

        <div className="relative w-full">
          <input
            type="text"
            name="lname"
            value={data.lname}
            onChange={handleChange}
            placeholder="Last Name"
            className="input input-bordered w-full bg-gray-200 max-w-x placeholder-[#BCBDBF] text-gray-600 px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none"
            required
          />
        </div>

        <div className="relative w-full">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full bg-gray-200 max-w-x placeholder-[#BCBDBF] text-gray-600 px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none"
            required
          />
        </div>

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered font-normal bg-gray-200 text-gray-600 w-full max-w-x placeholder-[#BCBDBF] px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none"
            required
          />
          <span
            onClick={handleShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-[#1B94A6]"
            >
              <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8-11-8-11-8z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </span>
        </div>

        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="input input-bordered font-normal bg-gray-200 text-gray-600 w-full max-w-x placeholder-[#BCBDBF] px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none"
            required
          />
          <span
            onClick={handleShowConfirmPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-[#1B94A6]"
            >
              <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8-11-8-11-8z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </span>
        </div>

        <button
          type="submit"
          className={`btn py-2 bg-[#1B94A6] border-[#1B94A6] text-white rounded-lg border ${
            isButtonDisabled
              ? "cursor-not-allowed opacity-70 text-black"
              : "cursor-pointer"
          }`}
        >
          Sign Up
        </button>

        <div className="mt-2">
          <p className="text-sm text-gray-600">
            {"Already have an account?"}{" "}
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
