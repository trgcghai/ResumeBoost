import OverviewCards from "../components/OverviewCards";
import UserActivityChart from "../components/chart/UserActivityChart";
import CVScorePieChart from "../components/chart/CvScorePieChart";
import RecentUsersTable from "../components/table/RecentUsersTable";
import RecentCVsTable from "../components/table/RecentCvsTable";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <Button className="flex items-center text-textNormal gap-2 bg-white border text-sm font-medium px-4 py-2 rounded-md hover:bg-mainHover hover:text-white transition duration-200 ease-in-out">
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
        </Button>
      </div>

      <OverviewCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <UserActivityChart />
        <CVScorePieChart />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <RecentUsersTable />
        <RecentCVsTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
