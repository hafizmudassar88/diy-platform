"use client";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-center p-6">
      <div className="text-red-600">
        <h1 className="text-4xl font-bold mb-4">🚫 Unauthorized Access</h1>
        <p className="text-lg">
          You are not allowed to view this template because it is not approved
          yet.
        </p>
        <p className="mt-2 text-gray-600">
          Please contact the creator or try again later once the template is
          published.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
