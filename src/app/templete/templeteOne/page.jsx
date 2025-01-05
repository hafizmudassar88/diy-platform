import React from "react";
import Hero from "./home/components/Hero";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";

const Page = () => {
  return (
    <div className="bg-white">
      <Hero />
      <AboutPage />
      <ContactPage />
    </div>
  );
};

export default Page;
