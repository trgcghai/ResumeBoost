import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import AdminSidebar from "@/components/layout/AdminSidebar";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white text-black px-6 py-4 shadow-md border border-b-gray-300/50">
        <h1 className="text-xl font-bold">ResumeBoostAdmin</h1>
      </header>
      <div className="flex flex-grow">
        {/* Admin sidebar */}
        <AdminSidebar />

        {/* Admin content area */}
        <main className="flex-grow p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
