const ErrorMessage = ({ message }) => {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-[#1B94A6]">
        <p className="text-white text-xl text-center">
          Something went wrong: {message}
        </p>
      </div>
    );
  };
  
  export default ErrorMessage;