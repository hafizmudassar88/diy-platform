import React from "react";
import Header from "./component/header";
import TemplateCard from "./component/templeteCard";

const page = () => {
  return (
    <>
      {/* header */}
      {/* <Header /> */}
      <div className="flex justify-center flex-col  gap-4 items-center min-h-[80vh] text-blue-950">
        <div className="text-5xl font-bold">Choose your template</div>
        <div className="text-xl">
          Pick the one you love and customize it for your new website
        </div>
        <div className="mt-5">
          <TemplateCard />
        </div>
      </div>
    </>
  );
};

export default page;
