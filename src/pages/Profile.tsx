import React, { useState } from "react";
import Overview from "../components/OverView";
import Card from "../components/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      id: "1",
      title: "Frontend Developer CV",
      uploadTime: "Tải lên: 10:30 15/12/2023",
      score: 87,
    },
    {
      id: "2",
      title: "Frontend Developer CV",
      uploadTime: "Tải lên: 10:30 15/12/2023",
      score: 87,
    },
    {
      id: "3",
      title: "Frontend Developer CV",
      uploadTime: "Tải lên: 10:30 15/12/2023",
      score: 87,
    },
    {
      id: "4",
      title: "Frontend Developer CV",
      uploadTime: "Tải lên: 10:30 15/12/2023",
      score: 87,
    },
  ]);

  const [scoreFilter, setScoreFilter] = useState("all");

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      {/* Overview Section */}
      <Overview />

      {/* CV List Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Danh sách CV của bạn</h2>

          {/* Search Bar */}
          <div className="">
            <input
              type="text"
              placeholder="Tìm kiếm CV"
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex space-x-4 mb-6">
          <Select value={scoreFilter} onValueChange={setScoreFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo điểm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="high">Điểm cao (90+)</SelectItem>
              <SelectItem value="average">Điểm trung bình (70-90)</SelectItem>
              <SelectItem value="low">Điểm thấp (&lt;70)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* CV Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
