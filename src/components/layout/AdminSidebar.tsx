import { Home, Users, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const sidebarItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/admin/dashboard" },
    {
      name: "Quản lý người dùng",
      icon: <Users size={20} />,
      path: "/admin/users",
    },
    { name: "Quản lý cv", icon: <FileText size={20} />, path: "/admin/cvs" },
  ];

  return (
    <div className="w-64 bg-white border-r min-h-screen py-6 px-2">
      <div className="space-y-2">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
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
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
