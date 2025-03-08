"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

// Initial resume state - all fields optional
const initialResumeState = {
    profileImage: "",
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    education: [],
    experience: [],
    skills: [],
    projects: [],
    social: [],
};

// Creating a context for resume data
const ResumeContext = createContext(undefined);

// Utility function to check if all fields of an object are empty
const isObjectEmpty = (obj) => {
    if (!obj) return true;

    return Object.entries(obj).every(([key, value]) => {
        if (value === null || value === undefined) return true;
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === "object") return isObjectEmpty(value);
        return value === "";
    });
};

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(initialResumeState);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    // Function to reset resume data to initial state
    const resetResumeData = useCallback(() => {
        setResumeData(initialResumeState);
    }, []);

    // Function to update resume data from API
    const setResumeDataFromApi = useCallback((apiData) => {
        if (!apiData) return;

        // Ensure we handle various null/undefined scenarios
        setResumeData({
            profileImage: apiData.profileImage || "",
            name: apiData.name || "",
            title: apiData.title || "",
            email: apiData.email || "",
            phone: apiData.phone || "",
            location: apiData.location || "",
            about: apiData.about || "",
            education: Array.isArray(apiData.education) ? apiData.education : [],
            experience: Array.isArray(apiData.experience) ? apiData.experience.map(exp => ({
                ...exp,
                description: Array.isArray(exp.description) ? exp.description : []
            })) : [],
            skills: Array.isArray(apiData.skills) ? apiData.skills.map(skill => ({
                ...skill,
                items: Array.isArray(skill.items) ? skill.items : []
            })) : [],
            projects: Array.isArray(apiData.projects) ? apiData.projects.map(project => ({
                ...project,
                technologies: Array.isArray(project.technologies) ? project.technologies : []
            })) : [],
            social: Array.isArray(apiData.social) ? apiData.social : [],
        });

        console.log("Resume data loaded from API:", apiData);
    }, []);

    // Function to update resume data
    const updateResumeData = useCallback((newData) => {
        setResumeData((prev) => ({
            ...prev,
            ...newData,
        }));
    }, []);

    // Function to toggle preview mode
    const togglePreviewMode = useCallback(() => {
        setIsPreviewMode((prev) => !prev);
    }, []);

    // Check if the resume is empty
    const isResumeEmpty = useCallback(() => {
        if (!resumeData) return true;

        // Check if at least some essential fields are populated
        return !(
            resumeData.name ||
            resumeData.email ||
            resumeData.about ||
            (resumeData.education && resumeData.education.length > 0 && resumeData.education[0]?.school) ||
            (resumeData.experience && resumeData.experience.length > 0 && resumeData.experience[0]?.company)
        );
    }, [resumeData]);

    return (
        <ResumeContext.Provider
            value={{
                resumeData,
                updateResumeData,
                resetResumeData,
                setResumeDataFromApi,
                isResumeEmpty,
                isPreviewMode,
                togglePreviewMode,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};

// Custom hook to access resume context
export const useResumeContext = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error("useResumeContext must be used within a ResumeProvider");
    }
    return context;
};