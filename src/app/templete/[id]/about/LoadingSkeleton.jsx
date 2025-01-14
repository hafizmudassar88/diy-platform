const LoadingSkeleton = () => {
    return (
      <div className="bg-[#1B94A6] w-full min-h-[80vh] flex flex-col md:flex-row animate-pulse">
        {/* Image Skeleton */}
        <div className="md:w-1/2 flex justify-center items-center min-h-[80vh] p-6">
          <div className="bg-gray-300 rounded-xl w-full h-[500px] max-w-4xl" />
        </div>
  
        {/* Content Skeleton */}
        <div className="md:w-1/2 flex flex-col justify-center items-center py-8 px-6">
          <div className="bg-gray-300 h-8 w-3/4 mb-6 rounded" />
          <div className="bg-gray-300 h-4 w-full mb-2 rounded" />
          <div className="bg-gray-300 h-4 w-5/6 mb-2 rounded" />
          <div className="bg-gray-300 h-4 w-4/5 mb-2 rounded" />
        </div>
      </div>
    );
  };
  
  export default LoadingSkeleton;