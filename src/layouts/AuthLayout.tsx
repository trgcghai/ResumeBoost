import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-10 flex items-center px-4 py-2 justify-start bg-white border-b border-gray-300/30">
        <h1 className="text-2xl font-bold text-center text-black">
          ResumeBoost
        </h1>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
