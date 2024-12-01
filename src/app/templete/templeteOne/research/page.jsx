"use client";
import { useState } from "react";
import { Blogsdata } from "./component/data";
import Image from "next/image";
import blogImage from "../../../../../public/images/bl_01_576d8097-08a2-4503-b06b-a499c5e261f0.jpg";

const BlogsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 1;

  // Pagination logic
  const totalPages = Math.ceil(Blogsdata.length / blogsPerPage);
  const currentBlogs = Blogsdata.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-goldenLight">
        Reseach
      </h1>
      {currentBlogs.map((blog) => (
        <div key={blog.id} className="mb-8 p-4 border rounded-lg shadow-md">
          {blog.image && (
            <Image
              width={500}
              height={500}
              src={blogImage}
              alt={blog.title}
              className="w-full h-64 object-cover mb-4 rounded"
            />
          )}
          <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
          <p className="text-sm text-gray-500 mb-4">
            By {blog.author} on {blog.date}
          </p>
          <p className="text-gray-700">{blog.content}</p>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-lg ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#1B94A6] text-white hover:bg-[#1B94A6]"
          }`}
        >
          Previous
        </button>
        <p className="text-gray-700">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#1B94A6] text-white hover:bg-[#1B94A6]"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogsPage;
