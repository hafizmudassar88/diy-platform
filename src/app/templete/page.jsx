"use client";
import React, { useEffect } from "react";
import TemplateCard from "./component/templeteCard";
import { useDispatch, useSelector } from "react-redux";
import { getTemplateData } from "@/redux/templateSlice";
import PublishedTemplateCard from "./component/publishedTempleteCard";

const TemplatesPages = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.template);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getTemplateData());
    }

    console.log("data: " + JSON.stringify(data));
  }, [dispatch, status]);

  return (
    <div className="bg-white grid gap-y-20 mt-20 p-5 py-10">
      <div className="flex justify-center flex-col  gap-4 items-center text-blue-950">
        <div className="text-5xl font-bold">Choose your template</div>
        <div className="text-xl">
          Pick the one you love and customize it for your new website
        </div>
        <div className="mt-5">
          <TemplateCard />
        </div>
      </div>

      <div className="flex justify-center flex-col  gap-4 items-center text-blue-950">
        <div className="text-5xl font-bold">Published template</div>
        <div className="flex gap-x-8 mt-5">
          {data.map((item, index) => (
            <PublishedTemplateCard key={index} data={item} />
          ))}
          {/* <TemplateCard /> */}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPages;
