import InfoCard from "./InfoCard";

const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
      <InfoCard
        title="Tổng người dùng"
        value="1,248"
        change="+12.5%"
        icon="users"
      />
      <InfoCard title="CV đã tạo" value="3,782" change="+18.2%" icon="file" />
    </div>
  );
};

export default OverviewCards;
