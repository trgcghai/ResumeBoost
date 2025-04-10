import React, { useState } from 'react';
import Overview from '../components/OverView';
import Card from '../components/Card';

interface CV {
  id: string;
  title: string;
  uploadTime: string;
  score: number;
}

const Profile: React.FC = () => {
  // Sample data for CVs
  const [cvs] = useState<CV[]>([
    {
      id: '1',
      title: 'Frontend Developer CV',
      uploadTime: 'Tải lên: 10:30 15/12/2023',
      score: 87,
    },
    {
      id: '2',
      title: 'Frontend Developer CV',
      uploadTime: 'Tải lên: 10:30 15/12/2023',
      score: 87,
    },
    {
      id: '3',
      title: 'Frontend Developer CV',
      uploadTime: 'Tải lên: 10:30 15/12/2023',
      score: 87,
    },
    {
      id: '4',
      title: 'Frontend Developer CV',
      uploadTime: 'Tải lên: 10:30 15/12/2023',
      score: 87,
    },
  ]);

  return (
    <div className="container mx-auto p-6">
      {/* Overview Section */}
      <Overview />

      {/* CV List Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Danh sách CV của bạn</h2>

        {/* Filter Bar */}
        <div className="flex space-x-4 mb-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Tất cả</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
            Điểm cao (90+)
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
            Điểm trung bình (70-90)
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
            Điểm thấp (&lt;70)
          </button>
        </div>

        {/* CV Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cvs.map((cv) => (
            <Card
              key={cv.id}
              id={cv.id}
              title={cv.title}
              uploadTime={cv.uploadTime}
              score={cv.score}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;