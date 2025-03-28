"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { Education } from "./components/education";
import { Experience } from "./components/experience";
import { Skills } from "./components/skills";
import { Projects } from "./components/projects";
import { Contact } from "./components/contact";

const sampleData = {
  id: 1,
  profileImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
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
    {
      category: "Tools & Platforms",
      items: ["Git", "Docker", "AWS", "Linux"],
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

// Create a separate component that uses useSearchParams
function ResumeContent() {
  const [resumeData, setResumeData] = useState(sampleData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const templateId = searchParams.get("id");

  useEffect(() => {
    const fetchTemplateData = async () => {
      if (!templateId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/template/${templateId}`);
        if (response.status === 200 && response.data?.details?.resume) {
          const apiData = response.data.details.resume;

          setResumeData({
            id: apiData.id || templateId,
            profileImage: apiData.profileImage || "",
            name: apiData.name || "",
            title: apiData.title || "",
            email: apiData.email || "",
            phone: apiData.phone || "",
            location: apiData.location || "",
            about: apiData.about || "",
            education: Array.isArray(apiData.education)
              ? apiData.education
              : [],
            experience: Array.isArray(apiData.experience)
              ? apiData.experience.map((exp) => ({
                  ...exp,
                  description: Array.isArray(exp.description)
                    ? exp.description
                    : [],
                }))
              : [],
            skills: Array.isArray(apiData.skills)
              ? apiData.skills.map((skill) => ({
                  ...skill,
                  items: Array.isArray(skill.items) ? skill.items : [],
                }))
              : [],
            projects: Array.isArray(apiData.projects)
              ? apiData.projects.map((project) => ({
                  ...project,
                  technologies: Array.isArray(project.technologies)
                    ? project.technologies
                    : [],
                }))
              : [],
            social: Array.isArray(apiData.social) ? apiData.social : [],
          });
        } else {
          setError("Failed to load resume data");
        }
      } catch (err) {
        console.error("Error fetching template:", err);
        setError("Error loading resume. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateData();
  }, [templateId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative min-h-screen">
        <Nav />
        <main className="relative">
          <Hero data={resumeData} />
          {resumeData.education && resumeData.education.length > 0 && (
            <Education data={resumeData} />
          )}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <Experience data={resumeData} />
          )}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <Skills data={resumeData} />
          )}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <Projects data={resumeData} />
          )}
          <Contact data={resumeData} />
        </main>
      </div>
    </div>
  );
}

// Main component that wraps ResumeContent with Suspense
function ResumePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading resume template...</p>
          </div>
        </div>
      }
    >
      <ResumeContent />
    </Suspense>
  );
}

export default ResumePreviewPage;
