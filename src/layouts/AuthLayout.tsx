import React from "react";
import { Link, Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-10 flex items-center px-4 py-2 justify-start bg-white border-b border-gray-300/30">
        <Link to={"/"} className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="w-10 rounded aspect-square" />
          <p className="text-xl font-bold">ResumeBoost</p>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
