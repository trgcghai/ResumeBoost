import FileUploader from "@/components/FileUploader";
import LoaderDialog from "@/components/LoaderDialog";
import { Button } from "@/components/ui/button";
import { analyzeResume, processResume } from "@/controllers/ResumeController";
import { useAppDispatch } from "@/hooks/redux";
import {
  hideLoaderDialog,
  showLoaderDialog,
  showLoaderDialogWithError,
} from "@/store/slices/loaderDialogSlice";
import readFileAsBase64 from "@/utils/readFileAsBase64";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface response {
  success: boolean;
  message: string;
  error?: object;
  result?: {
    createResumeResult?: { id: string };
    createJobDescriptionResult?: { id: string };
    analysisId?: string;
    uploadResult?: object;
  };
}

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleProcess = async () => {
    if (!file || !jobDescription) {
      console.log("thiếu thông tin");
      return;
    }

    setIsUploading(true);
    dispatch(showLoaderDialog("Đang phân tích CV của bạn..."));

    try {
      const fileBase64 = await readFileAsBase64(file);

      const uploadResult = (await processResume({
        fileBase64,
        fileName: file.name,
        jobDescription,
      })) as response;

      console.log("Upload result:", uploadResult);

      if (uploadResult?.success) {
        setFile(null);
        setJobDescription("");

        await handleAnalyze(uploadResult);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      dispatch(
        showLoaderDialogWithError(
          "Có lỗi xảy ra khi tải CV lên, vui lòng thử lại sau."
        )
      );
    }
  };

  const handleAnalyze = async (uploadResult: response) => {
    try {
      const { id: resumeId } = uploadResult?.result?.createResumeResult ?? {};
      const { id: jobDescriptionId } =
        uploadResult?.result?.createJobDescriptionResult ?? {};

      const analyzeResult = (await analyzeResume({
        resumeId: resumeId || "",
        jobDescriptionId: jobDescriptionId || "",
      })) as response;

      if (analyzeResult?.success) {
        dispatch(hideLoaderDialog());
        setIsUploading(false);
        setFile(null);
        setJobDescription("");

        navigate(`/details/${analyzeResult?.result?.analysisId}`);
      }
    } catch (error) {
      console.error("Error analyzing resume:", error);
      dispatch(
        showLoaderDialogWithError(
          "Có lỗi xảy ra khi phân tích CV, vui lòng thử lại sau."
        )
      );
    }
  };

  return (
    <>
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
          <label className="block font-semibold mb-2">
            Nhập mô tả công việc
          </label>
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
          onClick={handleProcess}
          disabled={!file || !jobDescription || isUploading}
        >
          {isUploading ? "Đang phân tích" : "Phân tích ngay"}
        </Button>
      </div>
      <LoaderDialog />
    </>
  );
};

export default Home;
