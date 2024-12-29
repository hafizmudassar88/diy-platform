"use client";
import { useState } from "react";

/**
 * Custom hook to handle file uploads to Cloudinary
 */
const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  /**
   * Upload file to Cloudinary
   * @param {File} file - File object from input
   * @returns {Promise<string>} Uploaded file URL
   */
  const uploadFile = async (file) => {
    if (!file) {
      throw new Error("No file selected");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      setUploading(true);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      setUploadedFileUrl(data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Upload Error:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, uploadedFileUrl, uploadFile };
};

export default useFileUpload;
