import CustomBreadcrumb from "@/components/layout/CustomBreadcrumb";
import UserProfileTable from "../components/table/UserProfileTable"; // Adjust the import path

export default function AdminDashboardUser() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h2>
      </div>

      <div>
        <CustomBreadcrumb />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <UserProfileTable />
      </div>
    </div>
  );
}
