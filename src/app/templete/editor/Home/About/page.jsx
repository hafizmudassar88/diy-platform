"use client";
import { updateHomeAbout } from "../../../../../redux/reducers/homeAbout";
import FileUpload from "../../../../../utlities/FileUpload";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";

const CustomForm = () => {
  const dispatch = useDispatch();
  const presistData = useSelector((state) => state.homeAbout);
  console.log(presistData);
  const [formData, setFormData] = useState({
    heading: "",
    subHeading: "",
    description: "",
  });

  const [color, setColor] = useState("#000000");
  const [uploadedImage, setUploadedImage] = useState(null);
  console.log("Uploaded image", uploadedImage);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setColor(presistData?.color);
  }, [presistData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      heading: formData.heading || presistData?.heading,
      description: formData.description || presistData?.description,
      backgroundImage: uploadedImage || presistData?.backgroundImage,
      color: color || presistData?.color,
    };

    dispatch(updateHomeAbout(data));
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-7xl mx-auto rounded-lg p-0 md:p-10">
      <form
        className="p-6 rounded-lg shadow-lg w-full bg-primaryBlack text-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-primaryBlue">
          About Section
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
          <label className="block text-primaryBlue font-bold mb-2">
            Background Image
          </label>
          <p>Image should be in landscape mode</p>
          <FileUpload
            onImageUpload={setUploadedImage}
            presistFile={presistData?.backgroundImage}
          />
        </div>

        <div className="mb-4">
          <label className="block text-primaryBlue font-bold mb-2">
            Heading Color
          </label>
          <SketchPicker
            color={color}
            onChange={(color) => setColor(color.hex)}
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
