"use client";

import useTemplate from "@/hooks/useTemplate";
import Image from "next/image";
import { useParams } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton"; // A custom loading skeleton component
import ErrorMessage from "../components/ErrorMessage";

const AboutPage = () => {
  const { id } = useParams(); // Extract dynamic route parameter
  const { templateData, loading, error } = useTemplate(id); // Fetch template data

  // Destructure data with fallback values
  const { title, bio, bioImage } = templateData?.details?.about || {
    title: "",
    bio: "",
    bioImage: "",
  };

  // Show loading skeleton while data is being fetched
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Show error message if there's an error
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="bg-[#1B94A6] w-full min-h-[80vh] flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center items-center min-h-[80vh] p-6 ps-0">
        <div className="relative max-w-4xl w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50 z-0" />
          <Image
            src={bioImage || "/default-image.jpg"} // Fallback image if bioImage is missing
            alt={title || "About Image"}
            width={500}
            height={500}
            className="rounded-xl relative z-10 object-cover"
            priority // Prioritize loading for above-the-fold images
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="md:w-1/2 flex flex-col justify-center items-center py-8 px-6">
        <h1 className="text-3xl md:text-4xl text-white font-semibold mb-6 text-center">
          {title}
        </h1>
        <p className="text-white text-lg text-center max-w-2xl">{bio}</p>
      </div>
    </div>
  );
};

export default AboutPage;
