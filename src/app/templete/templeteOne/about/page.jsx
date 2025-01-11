import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-[#1B94A6] w-full md:min-h-[80vh] flex md:flex-row flex-col ">
      <div className="md:w-1/2 ">
        <div className="flex justify-center items-center min-h-[80vh]">
          {" "}
          {/* Optional: Add a background to the outer container */}
          <div className="relative max-w-4xl w-full p-6">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent z-0 opacity-50"></div>{" "}
            {/* Gradient background */}
            <Image
              src={"/images/creativity.svg"}
              alt="Description"
              width={500}
              height={500}
              className="rounded-xl  relative z-10" // Rounded corners with a shadow and white border
            />
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center items-center flex-col py-4">
        <h1 className="text-[32px] text-white font-semibold py-5 ">
          Celebrating Creativity and Individuality{" "}
        </h1>
        <p className="text-white px-6">
          At DIY, we embrace the art of self-expression and creativity. Our
          platform is dedicated to empowering individuals to showcase their
          unique style and ideas. We combine modern innovation with timeless
          sophistication to provide tools and inspiration for crafting projects
          that elevate everyday living. From concept to completion, DIY is your
          space to redefine elegance and bring your vision to life.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
