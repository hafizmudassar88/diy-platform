import { ServiceCard } from "../../../../components/shared";
import React from "react";

const cardsdetail = [
  {
    image: "/images/software-development.jpg",
    title: "Customizable Templates",
    description:
      "Welcome to DIY Auto Detail, your one-stop solution for premium auto detailing services. We are a team of experienced",
    url: "/customizable-template",
  },
  {
    image: "/images/man-working-cms-development.jpg",
    title: "CMS for Dynamic Content Management",
    description:
      "Seamlessly manage and update your website content with an intuitive Content Management System (CMS). Add, edit, or remove blogs, research papers, and projects effortlessly without technical skills.",
    url: "/content-management-service",
  },
  {
    image: "/images/live-streaming.jpg",
    title: "Free Hosting and Publishing",
    description:
      "Publish your website with just a click! Enjoy free and reliable hosting services, ensuring your site stays online and accessible to everyone without any cost.",
    url: "/hosting-publishing",
  },
];

function Services({ showHeroSection = true, limit }) {
  const cardsToShow = limit ? cardsdetail.slice(0, limit) : cardsdetail;

  return (
    <div>
      {/* service cards  */}
      {showHeroSection ? (
        <div className="bg-white text-black/90 flex flex-col items-center gap-2 pb-5">
          <span className="inline-block mt-20 text-2xl uppercase text-[#1B94A6]">
            Our Services
          </span>

          <p
            data-aos="fade-up"
            className="text-3xl md:text-4xl font-extrabold text-md text-opacity-85 font_barlow text-center md:w-[35%]"
          >
            Explore Our Services
          </p>
        </div>
      ) : (
        <div className="bg-white grid grid-cols-1 md:grid-cols-[3fr_1fr]">
          <div className="bg-white text-black/90 flex flex-col items-start pl-10 gap-2 pb-5">
            <span className="inline-block ms-[2rem] mt-14 text-2xl uppercase text-[black]">
              Our Services
            </span>

            <p
              data-aos="fade-up"
              className="text-3xl md:text-4xl font-extrabold text-md text-opacity-85 font_barlow text-center md:w-[35%]"
            >
              Explore Our Services
            </p>
          </div>
        </div>
      )}

      <div className="bg-white grid grid-cols-1 md:grid-cols-3 gap-2 p-10">
        {cardsToShow.map(({ image, title, description, url }) => (
          <ServiceCard
            key={title}
            image={image}
            title={title}
            description={description}
            url={url}
          />
        ))}
      </div>
    </div>
  );
}

export default Services;
