import React from "react";

function CustomizeTemplate() {
  return (
    <div className="bg-white mt-10 px-4 md:px-20">

      {/* Customizable Templates  */}
      <div className="min-h-[70vh] grid grid-cols-1 md:grid-cols-[1fr_1fr] bg-[white]">
        {/* left side  */}
        <div className="w-full mt-4 p-10">
          <img
            src="/images/software-development.jpg"
            alt=""
            className="w-full h-full"
          />
        </div>

        {/* right side  */}
        <div className="bg-white text-black p-10 mt-10">
          <span className="inline-block mt-5 text-2xl uppercase border-b-4 border-[#1B94A6]">
            Customizable Templates
          </span>

          <h1
            data-aos="fade-down"
            className="mt-10 text-xl md:text-3xl font-extrabold"
          >
            Tailored Designs, Just for You{" "}
          </h1>

          <p
            data-aos="fade-up"
            className="mt-2 text-lg text-opacity-85 font_barlow text-justify"
          >
            Stand out with our customizable templates, designed to make your
            website truly yours. Choose from a variety of stunning layouts
            tailored for students, bloggers, and researchers. Personalize every
            detail – from colors and fonts to images and content – to perfectly
            reflect your style and purpose. Whether you’re showcasing your
            academic research, sharing your creative projects, or starting a
            personal blog, our templates make it effortless. Every template is
            mobile-friendly and optimized for a seamless viewing experience.
            Save time and focus on your content while we take care of the
            design. Let your website reflect your ideas, passions, and
            achievements with ease. Building your unique online presence has
            never been this easy!
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomizeTemplate;
