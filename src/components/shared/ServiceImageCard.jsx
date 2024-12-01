import React from "react";

function ServiceImageCard({ image = "", title = "", subtitle = "" }) {
  return (
    <div className="relative min-h-[50vh] bg-center bg-no-repeat bg-cover shadow-xl">
      <div
        className="rounded-3xl px-5 absolute inset-0 bg-center bg-no-repeat bg-cover transition-all duration-300"
        style={{ backgroundImage: `url(${image})` }}
      >
        <h1
          data-aos="fade-down"
          className="mt-1 text-black text-3xl font-extrabold"
        >
          {title}
        </h1>

        <h1
          data-aos="fade-down"
          className="mt-2 px-3 py-1 text-center w-1/2 text-white text-2xl font-extrabold bg-red-600 rounded-xl"
        >
          {subtitle}
        </h1>
      </div>
    </div>
  );
}

export default ServiceImageCard;
