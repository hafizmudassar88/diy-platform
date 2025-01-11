"use client";

import { useEffect, useState, Suspense } from "react";
import { useFormContext } from "@/contexts/FormContext";
import { HomeForm } from "./components/HomeForm";
import { AboutForm } from "./components/AboutForm";
import { ContactForm } from "./components/ContactForm";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import useTemplate from "@/hooks/useTemplate";
import BlogForm from "./components/BlogForm";
import ResearchForm from "./components/ResearchForm";

function EditorContent() {
  const [activeTab, setActiveTab] = useState("home");
  const [templateId, setTemplateId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { isTemplateEmpty, formData } = useFormContext();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("templateId");
    if (id) {
      setTemplateId(id);
    }
  }, [searchParams]);

  const { templateData, loading, error } = useTemplate(templateId);

  useEffect(() => {
    if (templateData) {
      console.log("template data: ", templateData);
    }
  }, [templateData]); // Logs when templateData changes

  const { details } = templateData || {};

  const tabs = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact Us" },
    { id: "blogs", label: "Blog" },
    { id: "research", label: "Research" },
  ];

  const renderForm = () => {
    switch (activeTab) {
      case "home":
        return <HomeForm data={details?.home} />;
      case "about":
        return <AboutForm data={details?.about} />;
      case "contact":
        return <ContactForm data={details?.contact} />;
      case "blogs":
        return <BlogForm data={details?.blogs} />;
      case "research":
        return <ResearchForm data={details?.research} />;
      default:
        return null;
    }
  };

  const backToWebsite = () => {
    router.push("/");
  };

  const publishWebsite = async () => {
    console.log("formData: ", formData);

    try {
      let response;
      if (templateData?._id) {
        const body = {
          templateId: templateData?._id,
          details: formData,
        };
        response = await axiosInstance.put("/template/update", body);
      } else {
        response = await axiosInstance.post("/template/create", formData);
      }

      if (response.status !== 200) {
        toast.error(response?.data?.message);
        return;
      }

      toast.success(
        `Template ${templateData?._id ? "updated" : "created"} successfully`
      );
      router.push("/");
    } catch (error) {
      toast.error(
        `Failed to ${templateData?._id ? "updated" : "create"} template`
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className={`hidden md:flex flex-col w-64 bg-[#1C9AAF] text-white`}>
        <nav className="flex flex-col p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 text-left rounded ${
                activeTab === tab.id
                  ? "bg-[#157A8C] font-bold"
                  : "hover:bg-[#157A8C] my-1"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-auto">
        {/* Mobile menu button */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden mb-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Mobile sidebar */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="w-64 h-full bg-[#1C9AAF] text-white p-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
                className="mb-4 text-[#1C9AAF] border-white hover:bg-[#157A8C] hover:text-white"
              >
                Close
              </Button>
              <nav className="flex flex-col">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`py-2 px-4 text-left rounded ${
                      activeTab === tab.id
                        ? "bg-[#157A8C] font-bold"
                        : "hover:bg-[#157A8C]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Form content */}
        <div className="grid gap-y-5 p-4">
          <h1 className="text-[#1C9AAF] text-4xl text-center font-bold mb-4">
            DIY Editor
          </h1>

          <div className="flex gap-x-5 justify-end">
            <Button onClick={backToWebsite}>Exit</Button>
            <Button
              onClick={publishWebsite}
              disabled={!isTemplateEmpty}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#20b1c9] hover:bg-[#1C9AAF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005bea]"
            >
              {templateId ? "Update" : "Publish"}
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-4">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </h1>
            {renderForm()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Editor() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditorContent />
    </Suspense>
  );
}
