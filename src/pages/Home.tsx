import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleAnalyze = () => {
    if (!file || !jobDescription) {
      console.log("thiếu thông tin");
      return;
    }

    // Handle file analysis with job description
    console.log("Analyzing CV:", file);
    console.log("Job Description:", jobDescription);

    // todo
    // call api to upload file to storage
    // call to firebase to store data in database
    // call to cloud function to call api to third party api to analyze cv
    // redirect to result page
  };

  return (
    <div className="mx-auto p-6 rounded shadow bg-white">
      <h2 className="text-center text-2xl font-bold mb-2">
        ResumeBoost - Tối ưu CV của bạn ngay hôm nay!
      </h2>
      <p className="text-center text-sm text-gray-500 mb-4">
        Tăng cơ hội vượt qua hệ thống ATS và gây ấn tượng với nhà tuyển dụng
      </p>

      <div className="mb-6 mx-auto">
        <label className="block font-semibold mb-2">Tải lên CV của bạn</label>
        <FileUploader onFileUpload={handleFileUpload} />
        {file && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
            <p className="text-green-600 text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </p>
            <XIcon
              size={18}
              className="text-danger cursor-pointer"
              onClick={() => setFile(null)}
            />
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Nhập mô tả công việc</label>
        <textarea
          className="w-full p-4 border rounded resize-none"
          rows={6}
          placeholder="Dán mô tả công việc vào đây…"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <Button
        className={`w-full text-lg bg-main text-white py-2 rounded hover:bg-mainHover cursor-pointer`}
        onClick={handleAnalyze}
        disabled={!file || !jobDescription}
      >
        Phân tích ngay
      </Button>
    </div>
  );
};

export default Home;
