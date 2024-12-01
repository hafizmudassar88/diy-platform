import Image from "next/image";
import React, { useEffect, useState } from "react";

const FileUpload = ({ onImageUpload, presistFile }) => {
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    setImageUrl(presistFile);
  }, [presistFile]);

  useEffect(() => {
    // Dynamically load the Cloudinary script when the component is mounted
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleUpload = () => {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: "dxqzrgxaz", // Replace with your Cloudinary cloud name
          uploadPreset: "diyyyyy", // Replace with your Cloudinary upload preset
          sources: ["local", "url", "camera"],
          showAdvancedOptions: true,
          cropping: true,
          multiple: false,
          maxFileSize: 2000000, // 2 MB max file size
          clientAllowedFormats: ["jpg", "jpeg", "png", "gif"],
        },
        (error, result) => {
          if (error) {
            console.log("Error uploading file:", error);
          }
          if (result && result.event === "success") {
            setImageUrl(result.info.secure_url);
            onImageUpload(result.info.secure_url);
            console.log("Upload successful!", result.info);
          }
        }
      );
    } else {
      console.log("Cloudinary script not loaded yet.");
    }
  };

  return (
    <div>
      {imageUrl && (
        <div className="border flex flex-row max-w-md justify-between mb-5 rounded-md border-primaryBlue ">
          <Image
            src={imageUrl}
            alt="Uploaded file"
            width={100}
            height={50}
            className="rounded-lg"
          />
        </div>
      )}
      <button
        onClick={handleUpload}
        className="w-full bg-primaryBlue text-primaryBlack font-bold py-2 px-4 rounded-lg hover:bg-white border border-primaryBlue hover:text-primaryBlue transition duration-300"
      >
        Upload Image
      </button>
    </div>
  );
};

export default FileUpload;
