"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [load, setLoad] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      setData((prev) => ({ ...prev, email: savedEmail }));
      setData((prev) => ({ ...prev, password: savedPassword }));
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    const isFormValid = emailValid && data.password.length > 0;
    setIsButtonDisabled(!isFormValid);
  }, [data.email, data.password]);

  const handleShowPassword = () => setShowPassword(!showPassword);

  //   async function handleLogin(e) {
  //     e.preventDefault();

  //     handleLoading();

  //     try {
  //       await login({ ...data });

  //       if (rememberMe) {
  //         localStorage.setItem("savedEmail", data.email);
  //         localStorage.setItem("savedPassword", data.password);
  //       } else {
  //         localStorage.removeItem("savedEmail");
  //         localStorage.removeItem("savedPassword");
  //       }
  //     } catch (error) {
  //       toast.error("An error occurred during login. Please try again.");
  //     } finally {
  //       // Stop showing spinner after login is done (whether success or error)
  //       setLoad(false);
  //     }
  //   }

  return (
    <div className="flex justify-center items-center custom-font  h-full md:mb-16 mb-8 md:mt-16 mt-32   flex-col ">
      <form
        // onSubmit={handleLogin}
        className={`flex max-w-lg gap-4 w-full  rounded-xl flex-col md:px-0 px-3 `}
      >
        <span className="text-3xl font-normal text-[#173039]">Login</span>
        <div className="relative w-full">
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder={"Email"}
            className={`input input-bordered w-full bg-gray-200 max-w-x placeholder-[#BCBDBF] text-gray-600 px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none`}
            required
          />
        </div>

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            value={data.password}
            maxLength={15}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder={"Password"}
            className={`input input-bordered font-normal bg-gray-200 text-gray-600 w-full max-w-x placeholder-[#BCBDBF] px-3.5 py-[10.8px] max-w-x border rounded-lg placeholder:text-base focus:border-[#87959A] focus:outline-none }`}
            required
          />
        </div>
        {/* <Link href={`/auth/forgetPassword`}>
          <p className="flex justify-end mt-[-14px] text-[14px] font-normal text-[var(--primary-color)] underline cursor-pointer">
            Forgot your password
          </p>
        </Link> */}

        <div className="flex items-center justify-start pt-5 pb-24">
          <input
            id="default-checkbox"
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="flex items-center me-2 w-4 h-4   rounded"
          />
          <label
            htmlFor="default-checkbox"
            className="checkbox-signin text-base font-normal text-gray-900 dark:text-[#87959A] text-font"
          >
            <span className="text-[#173039] text-base">Remember me</span>
          </label>
        </div>

        <button
          type="submit"
          className={`btn py-2  bg-[#1B94A6] border-[#1B94A6] text-white rounded-lg border `}
          //     ${
          //     load ? "cursor-not-allowed" : "cursor-pointer"
          //   }

          //   ${
          //     loading || isButtonDisabled
          //       ? "bg-gray-300 text-gray-600 border-gray-400 cursor-not-allowed"
          //       : "bg-primary-color text-white border-primary-color hover:bg-primary-color focus:bg-primary-color active:bg-primary-color"
          //   }
        >
          Login
        </button>

        <div className=" ">
          <p className="text-sm text-gray-600">
            {"Dont have an account?"}{" "}
            <Link
              href={`/main/auth/register`}
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
