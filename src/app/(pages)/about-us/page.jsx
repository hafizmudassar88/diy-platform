"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AboutUsCard, HeroSection } from "../../../components/shared";

// Dynamically import MediaPlayer to prevent SSR issues
const MediaPlayer = dynamic(
  () => import("../../../components/shared/MediaPlayer"),
  {
    ssr: false,
  }
);

const cardsDetail = [
  {
    title: "Full Safe and Secure",
    description:
      "We handle your data with great care and expertise. Choosing us comes with total peace.",
  },
  {
    title: "Satisfaction Guaranteed",
    description:
      "We strive to serve you better every day. All we deliver is your total satisfaction and trust in our services.",
  },
];

function AboutUs({ showHeroSection = true }) {
  return (
    <div className="bg-white">

      {/* About Us Section */}
      <div className="min-h-[70vh] grid grid-cols-1 md:grid-cols-2 bg-white">
        {/* Left Side */}
        <div className="p-10" data-aos="fade-right">
          <MediaPlayer src="/videos/Creating website script.json" />
        </div>

        {/* Right Side */}
        <div className="bg-white text-black p-10">
          <span className="inline-block mt-20 text-2xl uppercase border-b-4 border-[#1B94A6]">
            About Us
          </span>
          <h1 data-aos="fade-down" className="mt-10 text-3xl font-extrabold">
            Empowering Students to Share, Showcase, and Shine.
          </h1>
          <p
            data-aos="fade-up"
            className="mt-2 text-lg text-opacity-85 font_barlow text-justify"
          >
            {`We are passionate about providing students with the tools they need
            to build their digital presence. Our platform is designed to make
            website creation simple, intuitive, and accessible for everyone.
            Whether you're sharing your research, blogging your ideas, or
            showcasing your achievements, we’re here to help you stand out. Join
            us in creating a world where every student can share their voice and
            talents with confidence!`}
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="min-h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-x-10 bg-white p-10">
        {/* Left Side */}
        <div className="text-black">
          <span className="inline-block mt-20 text-2xl uppercase border-b-4 border-[#1B94A6]">
            Why Choose Us
          </span>
          <h1 data-aos="fade-down" className="mt-10 text-3xl font-extrabold">
            Empowering Students for Free – Your Creativity, Unleashed.
          </h1>
          <p
            data-aos="fade-up"
            className="mt-2 text-lg text-opacity-85 text-justify font_barlow"
          >
            At DIY, we believe in empowering everyone to showcase their
            creativity and achievements without limitations. With completely
            free tools, a user-friendly interface, and customizable templates,
            our platform ensures that website building is simple, intuitive, and
            fast. Go live in minutes and share your ideas with the world –
            because your vision deserves to be seen, all at no cost.
          </p>

          <div className="flex flex-col mt-5 gap-y-3">
            {cardsDetail.map(({ title, description }) => (
              <AboutUsCard
                key={title}
                title={title}
                description={description}
              />
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <div className="p-10">
            <MediaPlayer src="/videos/Web Development.json" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
