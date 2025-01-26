"use client";
import React, { useEffect } from "react";
import Hero from "./components/Hero";
import AboutPage from "../about/page";
import ContactPage from "../contact/page";
import BlogsPage from "../blogs/page";
import ResearchPage from "../research/page";

const TemplateHomePage = ({ data }) => {

  return (
    <div className="bg-white">
      <Hero data={data} />
      <AboutPage data={data} />
      <ContactPage data={data} />
      <BlogsPage data={data} />
      {/* <ResearchPage data={data} /> */}
    </div>
  );
};

export default TemplateHomePage;
