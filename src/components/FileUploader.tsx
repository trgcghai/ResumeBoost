import { useAppSelector } from "@/hooks/redux";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";

const FileUploader = ({
  onFileUpload,
}: {
  onFileUpload: (file: File) => void;
}) => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!user) {
        // Save current location before redirecting to login
        navigate("/auth/login", { state: { from: location.pathname } });
        return;
      }

      if (acceptedFiles && acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [navigate, onFileUpload, user, location]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed ${
        isDragActive ? "border-main bg-blue-50" : "border-main/30 bg-blue-100"
      } 
                    text-center py-10 cursor-pointer transition-colors duration-200 rounded-md`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-main font-medium">Thả file vào đây...</p>
      ) : (
        <>
          <p>Kéo và thả file vào đây</p>
          <p className="text-gray-500 text-sm my-2">Hoặc</p>
          <label
            htmlFor=""
            className="mt-2 bg-main text-white px-4 py-2 my-2 inline-block rounded hover:bg-mainHover"
          >
            Tìm kiếm file
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Hỗ trợ: PDF (Tối đa 10MB)
          </p>
        </>
      )}
    </div>
  );
};

export default FileUploader;
