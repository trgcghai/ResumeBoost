import React from 'react';

const Overview: React.FC = () => {
  return (
    <div className="mb-6">
      {/* User Info */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Nguyen Van A</h1>
        <p className="text-gray-600">nguyenvana@email.com</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Tổng số CV</h3>
          <p className="text-2xl font-bold">4</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Điểm trung bình</h3>
          <p className="text-2xl font-bold">86</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">CV gần nhất</h3>
          <p className="text-2xl font-bold">10:30 04/04/2025</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Tìm kiếm CV"
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Overview;