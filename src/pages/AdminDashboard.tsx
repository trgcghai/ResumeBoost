import OverviewCards from "../components/OverviewCards";
import UserActivityChart from "../components/chart/UserActivityChart";
import CVScorePieChart from "../components/chart/CvScorePieChart";
import RecentUsersTable from "../components/table/RecentUsersTable";
import RecentCVsTable from "../components/table/RecentCvsTable";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
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
