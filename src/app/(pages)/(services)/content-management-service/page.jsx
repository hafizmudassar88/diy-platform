import React from "react";

function ContentManagementService() {
  return (
    <div className="bg-white mt-10 px-4 md:px-20">

      {/* Customizable Templates  */}
      <div className="min-h-[70vh] grid grid-cols-1 md:grid-cols-[1fr_1fr] bg-white">
        {/* left side  */}
        <div className="w-auto">
          <img
            src="/images/man-working-cms-development.jpg"
            alt=""
            className="w-auto h-auto"
          />
        </div>

        {/* right side  */}
        <div className="bg-white text-black p-10 mt-10">
          <span className="inline-block mt-5 text-2xl uppercase border-b-4 border-[#1B94A6]">
            CMS for Dynamic Content Management
          </span>

          <h1
            data-aos="fade-down"
            className="mt-10 text-xl md:text-3xl font-extrabold"
          >
            Get Best CMS for Dynamic Content Management{" "}
          </h1>

          <p
            data-aos="fade-up"
            className="mt-2 text-lg text-opacity-85 font_barlow text-justify"
          >
            Take control of your website with our intuitive Content Management
            System (CMS). Easily manage blogs, research papers, portfolios, and
            more – all in one place. Add new content, update existing pages, or
            reorganize your site’s structure without any technical know-how. Our
            CMS ensures that your website stays fresh and dynamic, reflecting
            your latest ideas and achievements. Enjoy seamless editing and
            publishing, so you can focus on creating and sharing your best work.
            Designed with simplicity in mind, our CMS ensures that even
            first-time users can easily manage their websites. You can preview
            changes in real time before publishing, ensuring everything looks
            perfect. Our system is cloud-based, so you can access and manage
            your content from anywhere, on any device. Security is our priority,
            with features like auto-save and data backups to keep your work
            safe.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContentManagementService;
