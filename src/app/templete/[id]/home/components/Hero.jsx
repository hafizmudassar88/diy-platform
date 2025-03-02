import Image from "next/image";

const Hero = ({ data }) => {
  const {
    name = "Our Platform",
    tagLine = "Empowering Innovation",
    description = "Your journey starts here!",
    heroSectionImage = "",
  } = data?.details?.home || {};

  return (
    <div className="flex md:flex-row flex-col w-full md:py-32 bg-white">
      {/* Text Section */}
      <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left md:w-1/2 lg:ms-32 md:ms-8 px-4 md:px-0">
        <h1 className="text-5xl font-bold text-[#1B94A6] capitalize">
          Welcome to {name}
        </h1>
        <h1 className="text-2xl font-bold text-[#1B94A6] capitalize">
          {tagLine}
        </h1>
        <p className="text-[16px] mt-4">{description}</p>
        <div className="mt-8 flex justify-center">
          <button className="bg-[#1B94A6] text-white px-2 py-1 rounded-md">
            Get Started
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center md:mt-0 mt-6">
        <Image
          className="w-[30rem] object-cover"
          src={heroSectionImage || ""}
          alt="Hero Section Banner"
          width={480}
          height={320}
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
