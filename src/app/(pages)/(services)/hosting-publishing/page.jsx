import React from "react";

function HostingPublishing() {
  return (
    <div className="bg-white mt-10 px-4 md:px-20">

      {/* Customizable Templates  */}
      <div className="min-h-[70vh] grid grid-cols-1 md:grid-cols-[1fr_1fr] bg-white">
        {/* left side  */}
        <div className="w-full mt-4 p-10">
          <img
            src="/images/live-streaming.jpg"
            alt=""
            className="w-full h-full"
          />
        </div>

        {/* right side  */}
        <div className="bg-white text-black p-10 mt-10">
          <span className="inline-block mt-5 text-2xl uppercase border-b-4 border-[#1B94A6]">
            Free Hosting and Publishing
          </span>

          <h1 data-aos="fade-down" className="mt-10 text-3xl font-extrabold">
            Free Hosting and Publishing – Share Your Work with the World{" "}
          </h1>

          <p
            data-aos="fade-up"
            className="mt-2 text-lg text-opacity-85 font_barlow text-justify"
          >
            {`          Say goodbye to hosting fees and complicated setups. With our
            platform, you get free and reliable hosting, ensuring your website
            is always online and accessible to your audience. Whether you're a
            student showcasing your portfolio, a researcher sharing papers, or a
            blogger expressing ideas, publishing your website has never been
            easier. Our hosting services are optimized for speed and
            performance, giving your visitors a seamless browsing experience,
            whether they're on a desktop or mobile device. Enjoy unlimited
            bandwidth, so your site can grow with your audience without any
            hidden costs. Publishing is as simple as a single click. Once your
            website is ready, you can take it live instantly – no need for
            third-party services or technical knowledge. We take care of the
            backend, so you can focus on creating and sharing your content. With
            built-in SSL certification, your site and data are secure, giving
            you and your audience peace of mind. Plus, our servers are designed
            for 99.9% uptime, meaning your work is always accessible when it
            matters most. Need to make updates? No problem. Your website stays
            dynamic with real-time publishing – changes appear immediately,
            ensuring your audience always sees your latest work. With free
            hosting and publishing, we're breaking barriers so you can share
            your ideas, creativity, and achievements with the world without any
            cost. It’s our way of empowering you to focus on what truly matters:
            your story, your voice, and your impact.`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HostingPublishing;
