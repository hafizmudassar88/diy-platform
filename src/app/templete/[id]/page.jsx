"use client";
import React, { useEffect, useState } from "react";
import Contact from "./home/components/Contact";
import Description from "./home/components/Description";
import About from "./home/components/About";
import Hero from "./home/components/Hero";
import { useParams } from "next/navigation"; // Correct hook for accessing route params in App Router
import useTemplate from "@/hooks/useTemplate";

const UserTemplate = () => {
  const { id } = useParams(); // Use useParams to extract dynamic route parameter
  const { templateData, loading, error } = useTemplate(id); // Fetch template data based on the id

  useEffect(() => {
    console.log("template data: ", templateData);
  }, [templateData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white">
      <Hero />
      <About />
      <Description />
      <Contact />
    </div>
  );
};

export default UserTemplate;
