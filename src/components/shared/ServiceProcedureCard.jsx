import React from "react";

function ServiceProcedureCard({ service = {} }) {
  return (
    <div
      className="bg-white text-black p-7 rounded-3xl shadow-xl"
      data-aos="fade-up"
      key={service.title}
    >
      <h1 className="mt-2 text-xl md:text-3xl font-extrabold">{service.title}</h1>

      <h1 className="text-red-500 mt-3 mb-4 text-3xl font-extrabold">
        ${service.price}
      </h1>

      {Object.entries(service.procedure).map(([key, value]) => (
        <div className="" key={key}>
          <p className="font-semibold mt-4 capitalize">{key}</p>

          <ul className="ps-6 list-disc">
            {value.map((item) => (
              <li key={item} className="text-justify capitalize">{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <ul className="list-disc p-6">
        {
          service?.notes?.map((note, index) => (
            <li key={index} className="mt-4 text-red-500 text-justify capitalize">
              {note}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default ServiceProcedureCard;
