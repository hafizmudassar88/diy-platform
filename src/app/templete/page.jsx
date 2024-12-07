import React from "react";
import TemplateCard from "./component/templeteCard";

const page = () => {

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
        <div className="mt-5">
          <TemplateCard />
        </div>
      </div>
    </div>
  );
};

export default page;
