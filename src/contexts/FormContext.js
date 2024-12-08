"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

// Creating a context for form data
const FormContext = createContext(undefined);

// Utility function to check if all fields of an object are empty
const isObjectEmpty = (obj) => {
  return Object.values(obj).every((value) =>
    typeof value === "object" ? isObjectEmpty(value) : value === ""
  );
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    home: {
      logoImage: "",
      name: "",
      tagLine: "",
      description: "",
      heroSectionImage: "",
    },
    about: { bioImage: "", title: "", bio: "" },
    contact: { email: "", address: "" },
  });

  // Function to update specific form data
  const updateFormData = useCallback((tab, data) => {
    setFormData((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], ...data },
    }));
  }, []);

  // Check if the entire form (all pages) is empty
  const isTemplateEmpty = useCallback(() => {
    return isObjectEmpty(formData);
  }, [formData]);

  // Check if a specific page is empty
  const isPageEmpty = useCallback(
    (page) => {
      if (!formData[page]) return true; // If page doesn't exist, it's considered empty
      return isObjectEmpty(formData[page]);
    },
    [formData]
  );

  return (
    <FormContext.Provider
      value={{ formData, updateFormData, isTemplateEmpty, isPageEmpty }}
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
