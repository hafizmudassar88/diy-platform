import Image from "next/image";
import React from "react";
// import { Images } from "../../../../public/assets/Images";
import bannerImage from "../../../../../../public/images/bannerImage.png";

const Description = () => {
  return (
    <div className="bg-[#1B94A6] w-full md:min-h-[80vh] md:mt-16 flex md:flex-row flex-col ">
      <div className="md:w-1/2 ">
        <div className="flex justify-center items-center min-h-[80vh]">
          {" "}
          {/* Optional: Add a background to the outer container */}
          <div className="relative max-w-4xl w-full p-6">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent z-0 opacity-50"></div>{" "}
            {/* Gradient background */}
            <Image
              src={bannerImage}
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
          Redefining Elegance with DIY
        </h1>
        <p className="text-white px-6">
          At DIY, we believe that style is an expression of individuality, and
          elegance is timeless. Our mission is to create products that blend
          modern trends with classic sophistication, crafted with the highest
          quality materials. From concept to creation, every item in the DIY
          collection is designed to elevate your lifestyle and add a touch of
          refined luxury to your everyday moments.
        </p>
      </div>
    </div>
  );
};

export default Description;
