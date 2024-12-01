"use client";
import { updateHomeHero } from "../../../../../redux/reducers/homeHero";
import FileUpload from "../../../../../utlities/FileUpload";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";

const CustomForm = () => {
  const dispatch = useDispatch();
  const presistData = useSelector((state) => state.homeHero);
  const [formData, setFormData] = useState({
    heading: "",
    subHeading: "",
    description: "",
  });

  const [bgColor, setBgColor] = useState("#000000");
  console.log(bgColor);
  const [uploadedImage, setUploadedImage] = useState(null);
  console.log("Uploaded image", uploadedImage);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setBgColor(presistData?.color);
  }, [presistData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      heading: formData.heading || presistData?.heading,
      subheading: formData.subHeading || presistData?.subheading,
      description: formData.description || presistData?.description,
      backgroundColor: bgColor,
      image: uploadedImage || presistData?.image,
    };

    dispatch(updateHomeHero(data));
  };

  return (
    <div
      className="flex flex-col justify-center items-center max-w-7xl mx-auto rounded-lg p-0 md:p-10"
      style={{ backgroundColor: bgColor }}
    >
      <form
        className="p-6 rounded-lg shadow-lg w-full bg-primaryBlack text-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-primaryBlue">
          Hero Section
        </h1>
        <p className="text-gray-400 mb-6 text-center">
          Fill in the fields below to submit your form.
        </p>

        <div className="mb-4">
          <label className="block text-primaryBlue font-bold mb-2">
            Heading
          </label>
          <input
            type="text"
            name="heading"
            value={presistData?.heading || formData.heading}
            onChange={handleChange}
            className="w-full border border-primaryBlue bg-primaryBlack bg-white text-black rounded-lg p-2 focus:ring-primaryBlue focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primaryBlue font-bold mb-2">
            Sub Heading
          </label>
          <input
            type="text"
            name="subHeading"
            value={presistData?.subheading || formData.subHeading}
            onChange={handleChange}
            className="w-full border border-primaryBlue bg-primaryBlack bg-white text-black rounded-lg p-2 focus:ring-primaryBlue focus:outline-none"
            placeholder="Sub Heading"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primaryBlue font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={presistData?.description || formData.description}
            onChange={handleChange}
            className="w-full border border-primaryBlue bg-primaryBlack bg-white text-black rounded-lg p-2 focus:ring-primaryBlue focus:outline-none"
            placeholder="Write a description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primaryBlue font-bold mb-2">Image</label>
          <FileUpload
            onImageUpload={setUploadedImage}
            presistFile={presistData?.image}
          />
        </div>

        <div className="mb-4">
          <label className="block text-primaryBlue font-bold mb-2">
            Background Color
          </label>
          <SketchPicker
            color={presistData?.backgroundColor || bgColor}
            onChange={(color) => setBgColor(color.hex)}
            className="rounded-lg shadow-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primaryBlue text-primaryBlack font-bold py-2 px-4 rounded-lg hover:bg-white border border-primaryBlue hover:text-primaryBlue transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomForm;
