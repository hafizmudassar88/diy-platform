import React from "react";
import Button from "./Button";

const Contact = () => {
  return (
    <>
      <div className=" flex lg:flex-row flex-col md:mt-16 ">
        <div className="flex flex-col lg:w-1/3 justify-center items-center mt-5">
          <p className="text-[#1B94A6] text-[32px] text-start font-semibold">
            Contact Us
          </p>
          <p>Any question or remarks? Just write us a message!</p>
        </div>
        <div className="lg:w-1/3 md:mt-16">
          <form
            // onSubmit={handleSubmit}
            className=" rounded px-8 pt-6 pb-8"
          >
            <div className="">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#1B94A6] bg-white ring-2 ring-[#1B94A6] leading-tight focus:outline-none   
 focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                // value={formData.name}
                // onChange={handleChange}
              />
            </div>
            <div className="mb-4">
               
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#1B94A6] bg-white ring-2 ring-[#1B94A6] leading-tight focus:outline-none   
 focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                // value={formData.email}
                // onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <textarea
                className="shadow appearance-none   
 border rounded w-full py-2 px-3 text-[#1B94A6] bg-white ring-2 ring-[#1B94A6] leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                name="message"
                placeholder="Enter your message"
                // value={formData.message}
                // onChange={handleChange}
              ></textarea>
            </div>
            <div
              className="flex items-center justify-between"
            >
              <Button link="#" text="Submit" />
            </div>
          </form>{" "}
           
        </div>

        <div className="flex flex-col lg:w-1/3 justify-center items-center ">
          <p className="text-[#1B94A6] text-[32px] text-start font-semibold">
            Contact Us
          </p>
          <p>info@DIY.com</p>
          <p className="text-[#1B94A6] text-[32px] text-start font-semibold mt-5">
            Address
          </p>
          <p>Pakistan</p>
        </div>
      </div>
    </>
  );
};

export default Contact;
