import Link from "next/link";
import React from "react";
import AboutUs from "../about-us/page";
import Services from "../(services)/services/page";
import { TestimonialCarousel } from "./TestimonialCarousel";
import TypeWriter from "../../../components/shared/TypeWriter";
import MediaPlayer from "../../../components/shared/MediaPlayer";
const typewriterStrings = [
  "From Research to Recognition – Build Your Student Portfolio with Ease!",
  "Blog, Publish, Impress – Create Your Website in Minutes!",
  "Transform Your Ideas into Websites – No Coding Required!",
  "Present Your Passion – DIY Websites for Students, by Students!",
  "Highlight Your Achievements – Simple Tools for Academic Showcases!",
  "Build Your Brand – Websites Tailored for Students’ Needs!",
  "Turn Knowledge into a Presence – Create Your Site, Share Your Work!",
  "For Students, By Students – Easy Website Building for Academic Excellence!",
];

function Home() {
  return (
    <div
      className="bg-white bg-center bg-no-repeat bg-cover overflow-x-hidden"
    >
      {/* hero section  */}
      <div className="relative min-h-[80vh] bg-center bg-no-repeat bg-cover bg-white ">
        <div className="absolute inset-0 bg-white bg-center bg-no-repeat bg-cover opacity-[0.26] transition-all duration-300"></div>
        <div className="relative z-10 text-center md:text-start">
          <div className="w-full h-full flex flex-col md:flex-row pt-32 px-5 ">
            <div className="md:grow-3 order-2 md:order-1 md:ps-10 p-2">
              <TypeWriter
                strings={typewriterStrings}
                delay={2500}
                speed={5}
                deletionSpeed={40}
                className="inline-block pe-3 transition-all text-black mt-20 md:text-2xl uppercase border-b-4 border-[#1B94A6]-600"
              />

              <h1
                data-aos="fade-down"
                className="text-black mt-10 text-2xl md:text-5xl font-extrabold"
              >
                Showcase Your Knowledge – Build Your Website, Your Way!{" "}
              </h1>

              <p
                data-aos="fade-up"
                className="text-black mt-10 md:mt-1 text-justify md:text-start md:text-lg font-semibold text-opacity-85 font_barlow"
              >
                Empower your academic journey with a platform designed for
                students. Create stunning websites to showcase your blogs,
                research papers, and achievements – no coding skills needed.
                Start in minutes with easy-to-use templates and customizable
                options. Share your story, impress your peers, and build your
                online presence effortlessly!
              </p>

              <div data-aos="fade-right" className="mt-10">
                <Link
                  href={"/signup"}
                  className="btn bg-[#1B94A6] text-white text-xl w-40 border-0 hover:bg-red-600 hover:scale-110"
                >
                  Sign Up Now
                </Link>
              </div>
            </div>

            <div
              className="md:grow-1 w-full h-full order-1 md:order-2 items-center bg-white rounded-full"
              data-aos="fade-right"
            >
              <MediaPlayer
                src={"/videos/Boy learning from online website.json"}
              />
            </div>
          </div>
        </div>
      </div>

      <AboutUs showHeroSection={false} />
      <Services showHeroSection={false} limit={3} />

      <div className="bg-white pb-10">
        <div className="bg-white flex flex-col justify-center items-center text-black p-10">
          <span className="inline-block mt-20 text-2xl uppercase border-b-4 border-[#1B94A6]">
            Testimonials
          </span>

          <h1 data-aos="fade-down" className="mt-10 text-3xl font-extrabold">
            What Our Users Are Saying
          </h1>
        </div>

        <div data-aos="fade-up" className="w-[85vw] m-auto">
          <TestimonialCarousel />
        </div>
      </div>

      <div className="min-h-[80vh] bg-white text-white flex flex-col justify-center items-center gap-y-5 px-[20%]">
        <h1
          data-aos="fade-right"
          className="mt-10 text-center text-3xl font-extrabold text-black"
        >
          Get in Touch with Us for Your Website Creation Journey{" "}
        </h1>

        <h1
          data-aos="fade-left"
          className="mt-4 text-center text-lg text-black"
        >
          Thank you for choosing our platform to build your online presence.
          We’re here to support you every step of the way. Whether you have
          questions, need assistance, or want to share feedback, we’d love to
          hear from you. Feel free to reach out to us through email, phone, or
          our online support center. Let’s create something amazing together!
        </h1>

        <Link
          href={"/contact-us"}
          data-aos="fade-up"
          className="btn mb-5 border-0 bg-[#1B94A6]  text-white hover:bg-[#1B94A6] hover:scale-110"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

export default Home;
