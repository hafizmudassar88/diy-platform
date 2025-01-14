"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import TemplateCard from "./component/templeteCard";
import { useDispatch, useSelector } from "react-redux";
import { getTemplateData, removeTemplateData } from "@/redux/templateSlice";
import PublishedTemplateCard from "./component/publishedTempleteCard";
import { useUser } from "@/contexts/UserContext";

// Sample JSON data
const editableTemplate = {
  logoImage: "/images/bannerImage.png",
  name: "Template Title",
  description: "This is a template description",
};

const TemplatesPages = () => {
  const router = useRouter();
  const { isAuthenticated } = useUser();

  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.template);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to home page if not authenticated
      router.push("/");
    } else {
      // Fetch data only if authenticated
      dispatch(getTemplateData());
    }
  }, [isAuthenticated, router, dispatch]);

  if (!isAuthenticated) {
    // Return null or a loading spinner while redirecting
    return null;
  }

  return (
    <div className="bg-white grid gap-y-20 mt-20 p-5 py-10">
      <div className="flex justify-center flex-col  gap-4 items-center text-blue-950">
        <div className="text-5xl font-bold">Choose your template</div>
        <div className="text-xl">
          Pick the one you love and customize it for your new website
        </div>
        <div className="mt-5">
          <TemplateCard data={editableTemplate} />
        </div>
      </div>

      <div className="flex justify-center flex-col  gap-4 items-center text-blue-950">
        <div className="text-5xl font-bold">Published template</div>
        <div className="flex gap-x-8 mt-5">
          {data.map((item, index) => (
            <PublishedTemplateCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPages;
