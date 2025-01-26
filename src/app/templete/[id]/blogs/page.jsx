"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import BlogCard from "../../component/blogCard";
import useTemplate from "@/hooks/useTemplate";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";

const BlogsPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Extract dynamic route parameter
  const { templateData, loading, error } = useTemplate(id); // Fetch template data
  const { isAuthenticated } = useUser();

  // Safely access the blogs array
  const blogs = templateData?.details?.blogs || [];
  const templateId = templateData?._id;

  // Watch the blogs array and log its values whenever it changes
  useEffect(() => {
    console.log("Blogs updated:", blogs);
  }, [blogs]);

  return (
    <div className="bg-white grid gap-y-20 mt-8 p-5">
      {isAuthenticated && (
        <div className="flex justify-content-end ms-auto">
          <Button
            size="lg"
            onClick={() => router.push(`/templete/editor/?templateId=${id}`)}
          >
            Add Blog
          </Button>
        </div>
      )}

      <div className="flex justify-center flex-col  gap-4 items-center text-blue-950">
        <div className="text-5xl font-bold">Blogs</div>
        <div className="text-xl">Pick the one you love and read it</div>
        <div className="flex gap-x-8 mt-5">
          {blogs.length > 0 ? (
            blogs.map((item, index) => (
              <BlogCard key={index} data={item} templateId={templateId} />
            ))
          ) : (
            <div className="text-gray-500">No blogs available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
