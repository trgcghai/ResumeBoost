import InfoCard from "./InfoCard";

interface OverviewCardsProps {
  overviewData: {
    totalResumes: number;
    totalUsers: number;
  };
}

const OverviewCards = ({ overviewData }: OverviewCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
      <InfoCard
        title="Tổng người dùng"
        value={overviewData.totalUsers.toString()}
        icon="users"
      />
      <InfoCard
        title="Tổng CV đã upload"
        value={overviewData.totalResumes.toString()}
        icon="file"
      />
    </div>
  );
};

export default OverviewCards;
