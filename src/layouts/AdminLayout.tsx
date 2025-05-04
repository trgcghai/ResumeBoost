import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import AdminHeader from "@/components/layout/AdminHeader";

const AdminLayout: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-grow relative mt-20">
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <main
          className={`flex-grow p-3 sm:p-6 bg-gray-100 transition-all duration-300`}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
