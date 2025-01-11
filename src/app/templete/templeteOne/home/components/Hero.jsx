import bannerImage from "../../../../../../public/images/business-strategy.png";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex md:flex-row flex-col w-full md:py-32 bg-white">
      {/* Text Section */}
      <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left md:w-1/2 lg:ms-32 md:ms-8 px-4 md:px-0">
        <h1 className="text-5xl font-bold text-[#1B94A6] capitalize">
          Empowering Minds, Sharing Knowledge{" "}
        </h1>
        <h1 className="text-2xl font-bold text-[#1B94A6] capitalize">
          Create, Publish, and Inspire – Your Research, Your Voice
        </h1>
        <p className="text-[16px] mt-4">
          Welcome to the platform where scholars and students connect, create,
          and contribute to the world of knowledge. Publish your educational
          blogs and research for free, reach a global audience, and collaborate
          with like-minded thinkers to make a lasting impact.{" "}
        </p>
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
          src={bannerImage}
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
