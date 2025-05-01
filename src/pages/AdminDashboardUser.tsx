import CustomBreadcrumb from "@/components/layout/CustomBreadcrumb";
import UserProfileTable from "@/components/table/UserProfileTable/UserProfileTable";
import useFetchAdminData from "@/hooks/useFetchAdminData";

export default function AdminDashboardUser() {
  const { useUserProfile } = useFetchAdminData();
  const { profiles, loading } = useUserProfile();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h2>
      </div>

      <div>
        <CustomBreadcrumb />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Đang tải dữ liệu...</p>
          </div>
        ) : (
          profiles &&
          profiles.length > 0 && <UserProfileTable profiles={profiles} />
        )}
      </div>
    </div>
  );
}
