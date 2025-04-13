import { Home, Users, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { JSX } from "react";

const SidebarItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: JSX.Element;
  label: string;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium",
        isActive
          ? "bg-bgNormal text-black"
          : "text-textNormal hover:bg-gray-100 hover:text-black"
      )}
    >
      {icon}
      {label}
    </Link>
  );
};

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white border-r min-h-screen py-6 px-2">
      <nav className="space-y-2">
        <SidebarItem
          to="/admin/dashboard"
          icon={<Home size={18} />}
          label="Dashboard"
        />
        <SidebarItem
          to="/admin/users"
          icon={<Users size={18} />}
          label="Người dùng"
        />
        <SidebarItem to="/admin/cvs" icon={<FileText size={18} />} label="CV" />
      </nav>
    </div>
  );
};

export default AdminSidebar;
