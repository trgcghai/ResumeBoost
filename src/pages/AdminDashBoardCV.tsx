import CustomBreadcrumb from "@/components/layout/CustomBreadcrumb";
import CvManagementTable from "@/components/table/CvManagementTable/CvManagementTable";
import useFetchAdminData from "@/hooks/fetch/useFetchAdminData";

export default function AdminDashboardCV() {
  const { useResume } = useFetchAdminData();
  const { resumes, loading } = useResume();
  console.log(resumes);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý CV</h2>
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
          resumes &&
          resumes.length > 0 && <CvManagementTable resumes={resumes} />
        )}
      </div>
    </div>
  );
}
