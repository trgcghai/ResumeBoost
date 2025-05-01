import OverviewCards from "../components/OverviewCards";
import CVScorePieChart from "../components/chart/CvScorePieChart";
import RecentUsersTable from "../components/table/RecentUsersTable";
import RecentCVsTable from "../components/table/RecentCvsTable";
import useFetchAdminData from "@/hooks/fetch/useFetchAdminData";

const AdminDashboard = () => {
  const { useUserProfile, useResume, useOverview, useStatisticAnalyzeScore } =
    useFetchAdminData();
  const { profiles, loading: profileLoading } = useUserProfile(5, true);
  const { resumes, loading: resumeLoading } = useResume(5, true);
  const { overviewData, loading: overviewLoading } = useOverview();
  const { scoreData, loading: scoreLoading } = useStatisticAnalyzeScore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      </div>

      {overviewLoading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        </div>
      ) : (
        overviewData && <OverviewCards overviewData={overviewData} />
      )}

      <div className="grid grid-cols-1 gap-4 mb-4">
        {scoreLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Đang tải dữ liệu...</p>
          </div>
        ) : (
          scoreData && <CVScorePieChart data={scoreData} />
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <RecentUsersTable profiles={profiles} loading={profileLoading} />
        <RecentCVsTable resumes={resumes} loading={resumeLoading} />
      </div>
    </div>
  );
};

export default AdminDashboard;
