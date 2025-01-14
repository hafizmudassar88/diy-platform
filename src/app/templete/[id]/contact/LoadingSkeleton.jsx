const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col items-center md:mt-16 py-5 gap-y-2 animate-pulse">
      {/* Left Section Skeleton */}
      <div className="flex flex-col lg:w-1/3 justify-center items-center mt-5">
        <div className="h-8 w-48 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-64 bg-gray-300 rounded" />
      </div>

      {/* Middle Section Skeleton */}
      <div className="lg:w-1/3 md:mt-16 w-full max-w-md">
        <div className="rounded-lg bg-white shadow-lg px-8 pt-6 pb-8">
          <div className="h-10 bg-gray-300 rounded mb-4" />
          <div className="h-10 bg-gray-300 rounded mb-4" />
          <div className="h-24 bg-gray-300 rounded mb-6" />
          <div className="h-10 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Right Section Skeleton */}
      <div className="flex flex-col lg:w-1/3 justify-center items-center mt-5">
        <div className="h-8 w-48 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-64 bg-gray-300 rounded mb-5" />
        <div className="h-8 w-48 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-64 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;