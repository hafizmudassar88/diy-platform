import Image from "next/image";
import React from "react";
// import { Images } from "../../../../public/assets/Images";
import bannerImage from "../../../../../../public/images/bannerImage.png";
import Button from "./Button";

const Hero = () => {
  return (
    <div className="flex md:flex-row  flex-col w-full md:py-32 bg-primaryLight">
      {/* Text Section */}
      <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left md:w-1/2 lg:ms-32 md:ms-8 px-4 md:px-0">
        <h1 className="md:text-[48px] text-[32px] font-bold text-[#1B94A6]">
          Welcome to AutoLux - Your Ultimate Car Destination!
        </h1>
        <p className="text-[16px] mt-4">
          t AutoLux, we bring you a diverse range of cars, from luxury sedans
          and powerful SUVs to eco-friendly hybrids and electric vehicles
        </p>
        <div className="mt-8 flex justify-center">
          <Button link="#" text="Get Started" />
        </div>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center md:mt-0 mt-6">
        <Image className="w-[30rem]" src={bannerImage} alt="banner" />
      </div>
    </div>
  );
};

export default Hero;
