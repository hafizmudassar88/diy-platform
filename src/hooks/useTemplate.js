"use client";
import { fetchTemplateDataById } from "@/redux/api"; // Assuming fetchTemplateDataById is the API call
import { useState, useEffect } from "react";

/**
 * Custom hook to fetch template data, with localStorage caching.
 *
 * @param {string} templateId - The ID of the template to fetch.
 * @returns {Object} The template data, loading state, and error message.
 */
const useTemplate = (templateId) => {
  const [templateData, setTemplateData] = useState(null); // Stores template details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    /**
     * Get the template data from localStorage if it exists.
     *
     * @returns {Object|null} The cached template data or null.
     */
    const getTemplateFromLocalStorage = () => {
      const cachedTemplate = localStorage.getItem(`template-${templateId}`);
      if (cachedTemplate) {
        return JSON.parse(cachedTemplate);
      }
      return null;
    };

    /**
     * Fetch template data from the API and store it in localStorage.
     */
    const fetchTemplate = async () => {
      const cachedData = getTemplateFromLocalStorage();

      if (cachedData) {
        // If data is found in localStorage, use it directly
        setTemplateData(cachedData);
        setLoading(false);
        return;
      }

      try {
        // Start the API call only if the data is not cached
        const fetchedTemplateData = await fetchTemplateDataById(templateId);

        if (fetchedTemplateData) {
          // Update state with fetched data
          setTemplateData(fetchedTemplateData);

          // Cache the data in localStorage for future use
          // localStorage.setItem(
          //   `template-${templateId}`,
          //   JSON.stringify(fetchedTemplateData)
          // );
        } else {
          setError("Template not found.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching template data.");
      } finally {
        setLoading(false);
      }
    };

    if (templateId) {
      fetchTemplate();
    }
  }, [templateId]); // Run the effect when templateId changes

  return { templateData, loading, error };
};

export default useTemplate;
