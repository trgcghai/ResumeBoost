import OverviewCards from "../components/OverviewCards";
import UserActivityChart from "../components/UserActivityChart";
import CVScorePieChart from "../components/CvScorePieChart";
import RecentUsersTable from "../components/RecentUsersTable";
import RecentCVsTable from "../components/RecentCvsTable";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header Dashboard + Xuất báo cáo */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <button className="flex items-center gap-2 bg-white border text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
            />
          </svg>
          Xuất báo cáo
        </button>
      </div>

      {/* Tổng quan số liệu */}
      <OverviewCards />

      {/* Tabs */}
      <div className="flex space-x-4 pt-2 border-b pb-2">
        <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-1">
          Tổng quan
        </button>
        <button className="text-sm text-gray-500 hover:text-blue-600">
          Phân tích
        </button>
        <button className="text-sm text-gray-500 hover:text-blue-600">
          Báo cáo
        </button>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserActivityChart />
        <CVScorePieChart />
      </div>

      {/* Bảng dữ liệu */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentUsersTable />
        <RecentCVsTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
