import { useState, ChangeEvent } from "react";
import { NavLink, Outlet } from "react-router-dom";

// Define the component as a functional component with TypeScript
const DetailCV: React.FC = () => {
  // Define the type for cvFile state (it can be a File object or null)
  const [cvFile, setCvFile] = useState<File | null>(null);

  // Type the event for the file input change handler
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null; // Safely access the first file
    setCvFile(file);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Back Button */}
      <NavLink to="/" className="text-main flex items-center mb-4">
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Quay lại trang chủ
      </NavLink>

      {/* Main Title */}
      <h1 className="text-2xl font-bold mb-6">ĐÁNH GIÁ CHI TIẾT CV</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Left Section: CV Upload and Details */}
        <div className="col-span-2">
          {/* CV Upload Section */}
          <div className="border-2 border-main rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">CV của bạn</h2>
            <div className="bg-bgNormal h-120 flex items-center justify-center">
              {cvFile ? (
                <p>{cvFile.name}</p>
              ) : (
                <p className="text-gray-500">Tải CV của bạn lên đây</p>
              )}
            </div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="mt-4"
            />
          </div>
        </div>

        {/* Right Section: Overall Evaluation */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-2">
          <h2 className="text-lg font-semibold mb-4">Đánh giá tổng quan</h2>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-main flex items-center justify-center">
                <span className="text-2xl font-bold">100</span>
              </div>
            </div>
          </div>
          <div className="space-y-4 grid grid-cols-2 gap-6">
            <div className="">
              <div className="flex justify-between">
                <span>Mức độ phù hợp</span>
                <span>40</span>
              </div>
              <div className="w-full bg-bgNormal rounded-full h-2.5">
                <div
                  className="bg-main h-2.5 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Từ khóa phù hợp</span>
                <span>50</span>
              </div>
              <div className="w-full bg-bgNormal rounded-full h-2.5">
                <div
                  className="bg-main h-2.5 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Định dạng</span>
                <span>60</span>
              </div>
              <div className="w-full bg-bgNormal rounded-full h-2.5">
                <div
                  className="bg-main h-2.5 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Độ liên quan</span>
                <span>45</span>
              </div>
              <div className="w-full bg-bgNormal rounded-full h-2.5">
                <div
                  className="bg-main h-2.5 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* CV Details Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Đánh giá chi tiết</h2>
            <div className="flex space-x-4">
              <NavLink
                to="skills"
                className={({ isActive }) =>
                  `px-4 py-2 rounded hover:scale-105 ${
                    isActive
                      ? "bg-main text-white"
                      : "bg-bgNormal text-textDark"
                  }`
                }
              >
                Kỹ năng
              </NavLink>

              <NavLink
                to="analysis"
                className={({ isActive }) =>
                  `px-4 py-2 rounded hover:scale-105 ${
                    isActive
                      ? "bg-main text-white"
                      : "bg-bgNormal text-textDark"
                  }`
                }
              >
                Phân tích
              </NavLink>

              <NavLink
                to="suggestions"
                className={({ isActive }) =>
                  `px-4 py-2 rounded hover:scale-105 ${
                    isActive
                      ? "bg-main text-white"
                      : "bg-bgNormal text-textDark"
                  }`
                }
              >
                Gợi ý
              </NavLink>
            </div>
          </div>

          <div className="mt-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCV;
