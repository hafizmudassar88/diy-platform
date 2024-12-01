"use client";
import { updateAllFields } from "../../../../../redux/reducers/homeContact";
import FileUpload from "../../../../../utlities/FileUpload";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";

const CustomForm = () => {
  const dispatch = useDispatch();
  const presistData = useSelector((state) => state.homeContact);
  console.log("Persisted Data:", presistData);

  const [formData, setFormData] = useState({
    heading: "",
    subHeading: "",
    description: "",
    number: "",
    email: "",
    address: "",
  });

  const [color, setColor] = useState("#000000");
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    setColor(presistData?.color || "#000000");
    setFormData((prevFormData) => ({
      ...prevFormData,
      heading: presistData?.heading || "",
      subHeading: presistData?.subHeading || "",
      description: presistData?.description || "",
      number: presistData?.number || "",
      email: presistData?.email || "",
      address: presistData?.address || "",
    }));
  }, [presistData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      heading: formData.heading || presistData?.heading,
      description: formData.description || presistData?.description,
      backgroundImage: uploadedImage || presistData?.backgroundImage,
      color: color || presistData?.color,
      subHeading: formData.subHeading || presistData?.subHeading,
      number: formData.number || presistData?.number,
      email: formData.email || presistData?.email,
      address: formData.address || presistData?.address,
    };

    dispatch(updateAllFields(data));
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-7xl mx-auto rounded-lg p-0 md:p-10">
      <form
        className="p-6 rounded-lg shadow-lg w-full bg-primaryBlack text-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-primaryBlue">
          Contact Section
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
            value={formData.heading}
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
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-primaryBlue bg-primaryBlack bg-white text-black rounded-lg p-2 focus:ring-primaryBlue focus:outline-none"
            placeholder="Write a description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primaryBlue font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full border border-primaryBlue bg-primaryBlack bg-white text-black rounded-lg p-2 focus:ring-primaryBlue focus:outline-none"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primaryBlue font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-primaryBlue bg-primaryBlack bg-white text-black rounded-lg p-2 focus:ring-primaryBlue focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primaryBlue font-bold mb-2">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-primaryBlue bg-primaryBlack bg-white text-black rounded-lg p-2 focus:ring-primaryBlue focus:outline-none"
            placeholder="Enter your address"
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
