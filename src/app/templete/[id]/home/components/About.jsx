import Image from "next/image";
import React from "react";
// import { Images } from "../../../../public/assets/Images";
import about from "../../../../../../public/images/about.png";
import Button from "./Button";

const About = () => {
  return (
    <>
      <div className="text-center my-16 max-w-7xl mx-auto px-5 bg-[#1B94A6] rounded-lg ">
        <h1 className="text-[32px] text-white font-semibold py-5">
          Explore Our Services
        </h1>
        <p className="text-white">
          Browse our extensive inventory of new and pre-owned vehicles. Our
          expert team carefully selects each car, ensuring high standards of
          quality, reliability, and value. From sleek convertibles to
          family-friendly minivans, we have something for everyone.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
              imageUrl={about}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default About;

const Card = ({ title, description, buttonText, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10 w-full max-w-sm mx-auto mt-16">
      <div className="flex justify-center items-center">
        <Image
          src={imageUrl}
          alt={title}
          width={200}
          height={200}
          className="block"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-[#1B94A6] mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-center">
          <Button link="" text={buttonText} />
        </div>
      </div>
    </div>
  );
};

export const cardData = [
  {
    title: "Car Leasing & Financing",
    description:
      "Our financial experts offer personalized leasing and financing plans, making it easier for you to get the car you want without stretching your budget. We work with leading financial institutions to offer competitive rates and terms that fit your needs.",
    buttonText: "Shop Now",
    // imageUrl: Images.banner,
  },
  {
    title: "Trade-In Services",
    description:
      "Looking to upgrade? Trade in your current vehicle with us! Our simple, Trade in your current vehicle with us! Our simple, with us! Our simple, transparent trade-in process ensures that you get the best value, which you can put toward the car of your dreams.",
    buttonText: "Learn More",
    // imageUrl: Images.banner,
  },
  {
    title: "Service & Maintenance",
    description:
      "Keep your car in peak condition with our certified service team. We offer routine maintenance, repairs, detailing, and more. Our state-of-the-art facilities and skilled technicians will have your car running smoothly and looking great.",
    buttonText: "Learn More",
    // imageUrl: Images.banner,
  },
];
