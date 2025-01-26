"use client";
import { useParams } from "next/navigation";
import useTemplate from "@/hooks/useTemplate";
import { useEffect } from "react";
import ResearchCard from "../../component/researchCard";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";

const ResearchPage = () => {
  const { id } = useParams(); // Extract dynamic route parameter
  const { templateData, loading, error } = useTemplate(id); // Fetch template data
  const { isAuthenticated } = useUser();

  // Safely access the blogs array
  const researchPapers = templateData?.details?.research || [];
  const templateId = templateData?._id;

  return (
    <div className="bg-white grid gap-y-20 mt-8 p-5">
      {isAuthenticated && (
        <div className="flex justify-content-end ms-auto p-0">
          <Button
            size="lg"
            onClick={() => router.push(`/templete/editor/?templateId=${id}`)}
          >
            Add Reseach Paper
          </Button>
        </div>
      )}
      <div className="flex justify-center flex-col  gap-4 items-center text-blue-950">
        <div className="text-5xl font-bold">Research Papers</div>
        <div className="text-xl">Pick the one you love and read it</div>
        <div className="flex gap-x-8 mt-5">
          {researchPapers.length > 0 ? (
            researchPapers.map((item, index) => (
              <ResearchCard key={index} data={item} templateId={templateId} />
            ))
          ) : (
            <div className="text-gray-500">No research papers available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;
