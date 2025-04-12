"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import TemplateCard from "./component/templeteCard";
import { useDispatch, useSelector } from "react-redux";
import { getTemplateData } from "@/redux/templateSlice";
import PublishedTemplateCard from "./component/publishedTempleteCard";
import { useUser } from "@/contexts/UserContext";
import TemplateCard2 from "./component/templateCard2";

// Sample JSON data
const webAppTemplate = {
  logoImage:
    "https://png.pngtree.com/png-clipart/20190521/ourmid/pngtree-knowledge-network-trees-elements-of-studentseducational-thinking-back-to-school-png-image_1042961.jpg",
  name: "Web App",
  description: "This is Web App",
};

const resumeTemplate = {
  logoImage: "/images/resume.jpg",
  name: "Resume",
  description: "This is a resume template",
};

const TemplatesPages = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useUser(); // Get user role
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.template);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    } else {
      dispatch(getTemplateData());
    }
  }, [isAuthenticated, router, dispatch]);

  if (!isAuthenticated) {
    return null;
  }

  // Role-based filtering
  const filteredTemplates = data.filter((item) => {
    const creatorId = item.createdBy?._id; // fix: extract from nested object
    const isOwner = creatorId === user?.id;

    if (item.status === "APPROVED") return true;

    if (
      item.status === "PENDING" &&
      (isOwner || ["ADMIN", "SUPER_ADMIN"].includes(user?.role))
    ) {
      return true;
    }

    if (
      item.status === "CANCELLED" &&
      ["ADMIN", "SUPER_ADMIN"].includes(user?.role)
    ) {
      return true;
    }

    return false;
  });

  return (
    <div className="bg-white grid gap-y-20 mt-20 p-5 py-10">
      <div className="flex justify-center flex-col gap-4 items-center text-blue-950">
        <div className="text-5xl font-bold">Choose your template</div>
        <div className="text-xl">
          Pick the one you love and customize it for your new website
        </div>
        <div className="mt-5 flex gap-5">
          <div className="mt-5 flex gap-5">
            <div className="mt-5 flex gap-5">
              <TemplateCard data={webAppTemplate} />
              <TemplateCard2 data={resumeTemplate} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-col gap-4 items-center text-blue-950">
        <div className="text-5xl font-bold">Published Templates</div>
        <div className="flex gap-x-8 mt-5">
          {filteredTemplates.map((item, index) => (
            <PublishedTemplateCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPages;
