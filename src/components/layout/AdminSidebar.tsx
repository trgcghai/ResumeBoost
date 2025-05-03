import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Home, Users, FileText, X } from "lucide-react";
import { NavLink } from "react-router-dom";

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sidebarItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/admin/dashboard" },
    {
      name: "Quản lý người dùng",
      icon: <Users size={20} />,
      path: "/admin/users",
    },
    { name: "Quản lý cv", icon: <FileText size={20} />, path: "/admin/cvs" },
  ];

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile overlay to capture clicks outside sidebar */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div
        className={`
          ${
            isMobile
              ? "fixed left-0 top-0 h-full z-30 shadow-lg"
              : "sticky top-0 h-screen"
          }
          w-64 bg-white border-r py-6 px-2 overflow-auto
          transition-transform duration-300 ease-in-out
          ${
            isOpen
              ? "translate-x-0"
              : isMobile
              ? "-translate-x-full"
              : "-translate-x-64"
          }
        `}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt=""
                className="w-8 rounded aspect-square"
              />
              <p className="text-md font-bold">ResumeBoost Admin</p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Navigation Links */}
        <div className="space-y-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={handleLinkClick}
              className={({ isActive }) => {
                return (
                  "flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-mainHover hover:text-white " +
                  (isActive
                    ? "text-white bg-main hover:bg-mainHover"
                    : "text-textDark")
                );
              }}
            >
              {item.icon}
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
