import OverviewCards from "../components/OverviewCards";
import CVScorePieChart from "../components/chart/CvScorePieChart";
import RecentUsersTable from "../components/table/RecentUsersTable";
import RecentCVsTable from "../components/table/RecentCvsTable";
import useFetchAdminData from "@/hooks/fetch/useFetchAdminData";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const { useUserProfile, useResume, useOverview, useStatisticAnalyzeScore } =
    useFetchAdminData();
  const { profiles, loading: profileLoading } = useUserProfile(5, true);
  const { resumes, loading: resumeLoading } = useResume(5, true);
  const { overviewData, loading: overviewLoading } = useOverview();
  const { scoreData, loading: scoreLoading } = useStatisticAnalyzeScore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className=""
        variants={itemVariants}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        {overviewLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Đang tải dữ liệu...</p>
          </div>
        ) : (
          overviewData && <OverviewCards overviewData={overviewData} />
        )}

        <div className="grid grid-cols-1 gap-4 my-4">
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
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
