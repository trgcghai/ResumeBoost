import InfoCard from "./InfoCard";

const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <InfoCard
        title="Tổng người dùng"
        value="1,248"
        change="+12.5%"
        icon="users"
      />
      <InfoCard title="CV đã tạo" value="3,782" change="+18.2%" icon="file" />
      <InfoCard
        title="Doanh thu"
        value="42.5M VND"
        change="+8.4%"
        icon="credit-card"
      />
      <InfoCard
        title="Tỷ lệ chuyển đổi"
        value="24.8%"
        change="-2.5%"
        isNegative
        icon="activity"
      />
    </div>
  );
};

export default OverviewCards;
