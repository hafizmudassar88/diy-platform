import Image from "next/image";

const AboutPage = ({ data }) => {
  const {
    title = "Your journey starts here!",
    bio = "Our Platform",
    bioImage = "Empowering Innovation",
  } = data?.details?.about || {};

  return (
    <div className="bg-[#1B94A6] w-full md:min-h-[80vh] flex md:flex-row flex-col ">
      <div className="md:w-1/2 ">
        <div className="flex justify-center items-center min-h-[80vh]">
          {" "}
          {/* Optional: Add a background to the outer container */}
          <div className="relative max-w-4xl w-full p-6">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent z-0 opacity-50"></div>{" "}
            {/* Gradient background */}
            <Image
              src={bioImage || ""}
              alt="Description"
              width={500}
              height={500}
              className="rounded-xl  relative z-10" // Rounded corners with a shadow and white border
            />
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center items-center flex-col py-4">
        <h1 className="text-[32px] text-white font-semibold py-5 ">{title}</h1>
        <p className="text-white px-6">{bio}</p>
      </div>
    </div>
  );
};

export default AboutPage;
