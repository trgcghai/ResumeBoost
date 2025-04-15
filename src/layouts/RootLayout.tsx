import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const RootLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-bgLight">
      <Header />
      <main className="flex-grow px-4 py-6 mt-16 container mx-auto max-w-7xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
