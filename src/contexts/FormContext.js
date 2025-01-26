"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

// Initial form state
const initialFormState = {
  home: {
    logoImage: "",
    name: "",
    tagLine: "",
    description: "",
    heroSectionImage: "",
  },
  about: { bioImage: "", title: "", bio: "" },
  contact: { email: "", address: "" },
  blogs: [],
  research: [],
};

// Creating a context for form data
const FormContext = createContext(undefined);

// Utility function to check if all fields of an object are empty
const isObjectEmpty = (obj) => {
  return Object.values(obj).every((value) =>
    typeof value === "object" ? isObjectEmpty(value) : value === ""
  );
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialFormState);

  // Function to reset form data to initial state
  const resetFormData = useCallback(() => {
    setFormData(initialFormState);
  }, []);

  const setFormDataApiData = useCallback((apiData) => {
    setFormData(apiData);
  }, []);

  // Function to update specific form data
  const updateFormData = (tab, dataOrUpdater) => {
    setFormData((prev) => {
      const currentTabData = prev[tab] || {};
      if (typeof dataOrUpdater === "function") {
        return {
          ...prev,
          [tab]: dataOrUpdater(currentTabData),
        };
      }
      return {
        ...prev,
        [tab]: { ...currentTabData, ...dataOrUpdater },
      };
    });
  };

  // Function to add a new blog entry
  const addBlogEntry = useCallback((newBlog) => {
    setFormData((prev) => ({
      ...prev,
      blogs: [...(prev.blogs || []), newBlog],
    }));
  }, []);

  // Function to add a new research entry
  const addResearchEntry = useCallback((newResearch) => {
    setFormData((prev) => ({
      ...prev,
      research: [...(prev.research || []), newResearch],
    }));
  }, []);

  // Check if the entire form is empty
  const isTemplateEmpty = useCallback(() => {
    return isObjectEmpty(formData);
  }, [formData]);

  // Check if a specific page is empty
  const isPageEmpty = useCallback(
    (page) => {
      if (!formData[page]) return true;
      return isObjectEmpty(formData[page]);
    },
    [formData]
  );

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        addBlogEntry,
        addResearchEntry,
        isTemplateEmpty,
        isPageEmpty,
        resetFormData, // Include reset function in context
        setFormDataApiData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to access form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
