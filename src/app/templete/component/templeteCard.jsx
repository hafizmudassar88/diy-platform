import React from "react";
import templete1 from "../../../../public/images/bannerImage.png";
import Link from "next/link";

const TemplateCard = () => {
  // Sample JSON data
  const data = {
    imageUrl: "templete1",
    title: "Template Title",
    description: "This is a template description",
  };

  return (
    <div className="flex justify-center items-center  bg-gray-100 rounded-xl ring-2 ring-[#1B94A6] shadow-2xl">
      <div className="relative w-64 h-80 overflow-hidden rounded-lg shadow-lg group">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center transition-opacity duration-300 group-hover:opacity-60 bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${templete1.src})` }}
        />

        {/* Overlay with buttons */}
        <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40">
          <h2 className="text-white font-bold text-lg mb-2">{data.title}</h2>
          <p className="text-white text-sm mb-4">{data.description}</p>
          <div className="flex gap-4">
            <Link
              href="/templete/templeteOne"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500"
            >
              Preview
            </Link>
            <Link
              href="/templete/editor/Home/Hero"
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-500"
            >
              Choose
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
