import React from "react";
import Contact from "./home/components/Contact";
import Description from "./home/components/Description";
import About from "./home/components/About";
import Hero from "./home/components/Hero";

const Page = () => {
  return (
    <div className="bg-white">
      <Hero />
      <About />
      <Description />
      <Contact />
    </div>
  );
};

export default Page;
