"use client";
import { useFormContext } from "@/contexts/FormContext";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, Calendar, User } from "lucide-react";
import useTemplate from "@/hooks/useTemplate";
import { useUser } from "@/contexts/UserContext";

export default function BlogDetailPage() {
  const { id, blogId } = useParams(); // Use useParams to extract dynamic route parameter
  const { templateData, loading, error } = useTemplate(id); // Fetch template data based on the id
  const { user } = useUser();

  const blog = templateData?.details?.blogs?.find(
    (data) => data.id === Number(blogId)
  );

  if (error) {
    return <div className="text-center py-12">{error}</div>;
  }
  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="prose prose-lg mx-auto">
        {/* Hero Section */}
        <div className="mb-12">
          {blog.heroImage && (
            <img
              src={blog?.heroImage}
              alt={blog.tagline}
              className="rounded-xl shadow-xl w-full h-96 object-cover mb-8"
            />
          )}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            {blog.tagline}
          </h1>
          <div className="flex items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-sm">{user?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <time dateTime={new Date().toISOString()} className="text-sm">
                {new Date().toLocaleDateString()}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">5 min read</span>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="mt-8 space-y-8 text-lg text-gray-900">
          <p>{blog.description}</p>
        </div>
      </article>
    </div>
  );
}
