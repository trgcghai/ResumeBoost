import React from "react";

const Overview: React.FC = () => {
  return (
    <div className="mb-6">
      {/* User Info */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Nguyen Van A</h1>
        <p className="text-textNormal">nguyenvana@email.com</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-lg px-4 py-4 text-center flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tổng số CV</h3>
          <p className="text-2xl font-bold">4</p>
        </div>
        <div className="bg-white border rounded-lg px-4 py-4 text-center flex items-center justify-between">
          <h3 className="text-lg font-semibold">Điểm trung bình</h3>
          <p className="text-2xl font-bold">86</p>
        </div>
        <div className="bg-white border rounded-lg px-4 py-4 text-center flex items-center justify-between">
          <h3 className="text-lg font-semibold">CV gần nhất</h3>
          <p className="text-2xl font-bold">10:30 04/04/2025</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
