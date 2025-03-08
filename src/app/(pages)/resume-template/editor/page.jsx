"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useResumeContext } from "@/contexts/ResumeContext";
import ResumeForm from "@/components/ResumeForm";

function ResumeContent() {
  const [templateId, setTemplateId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [templateData, setTemplateData] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { resumeData, isResumeEmpty, setResumeDataFromApi, resetResumeData } =
    useResumeContext();

  useEffect(() => {
    const id = searchParams.get("templateId");
    if (id) {
      setTemplateId(id);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        if (!templateId) return;

        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(`/template/${templateId}`);
        if (response.status === 200) {
          setTemplateData(response.data);

          if (response.data.details?.resume) {
            setResumeDataFromApi(response.data.details.resume);
          }
        } else {
          setError("Failed to load template data");
        }
      } catch (err) {
        console.error("Error fetching template:", err);
        setError("Error loading template. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateData();
  }, [templateId, setResumeDataFromApi]);

  const backToWebsite = () => {
    router.push("/");
  };

  const publishResume = async () => {
    try {
      setLoading(true);
      let response;

      if (templateId) {
        const body = {
          templateId: templateId,
          details: {
            resume: resumeData,
          },
        };
        response = await axiosInstance.put("/template/update", body);
      } else {
        response = await axiosInstance.post("/template/create", {
          details: {
            resume: resumeData,
          },
        });
      }

      if (response.status !== 200) {
        toast.error(response?.data?.message || "Failed to save resume");
        return;
      }

      toast.success(
        `Resume ${templateId ? "updated" : "created"} successfully`
      );
      resetResumeData();

      router.push("/templete");
    } catch (error) {
      console.error("Resume save error:", error);
      toast.error(`Failed to ${templateId ? "update" : "create"} resume`);
    } finally {
      setLoading(false);
    }
  };

  const sampleData = {
    name: "John Doe",
    title: "Software Engineering Student",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    about:
      "Final year Computer Science student passionate about building scalable web applications and exploring new technologies.",
    education: [
      {
        school: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        start: "2020",
        end: "2024",
      },
    ],
    experience: [
      {
        company: "Tech Startup Inc.",
        title: "Software Engineering Intern",
        location: "Remote",
        start: "Jun 2023",
        end: "Aug 2023",
        description: [
          "Developed and maintained features for a React-based dashboard",
          "Implemented RESTful APIs using Node.js and Express",
          "Improved application performance by 40% through code optimization",
        ],
      },
    ],
    skills: [
      {
        category: "Programming Languages",
        items: ["JavaScript", "TypeScript", "Python", "Java"],
      },
      {
        category: "Web Technologies",
        items: ["React", "Node.js", "HTML/CSS", "REST APIs"],
      },
    ],
    projects: [
      {
        name: "Student Portfolio Platform",
        description:
          "A web platform for students to showcase their projects and connect with potential employers",
        technologies: ["React", "Node.js", "PostgreSQL"],
        link: "https://github.com/johndoe/portfolio",
      },
    ],
    social: [
      {
        platform: "GitHub",
        url: "https://github.com/johndoe",
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/johndoe",
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-[#1C9AAF] mb-4 md:mb-0">
            Resume Builder
          </h1>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={backToWebsite}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button
              onClick={publishResume}
              disabled={isResumeEmpty() || loading}
              className="flex items-center gap-2 bg-[#20b1c9] hover:bg-[#1C9AAF] text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005bea]"
            >
              <Save className="h-4 w-4" />
              {templateId ? "Update" : "Publish"}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6 px-4">
        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-lg">Loading resume data...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        ) : (
          <ResumeForm data={templateData?.details?.resume || sampleData} />
        )}
      </main>
    </div>
  );
}

export default function ResumePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumeContent />
    </Suspense>
  );
}
