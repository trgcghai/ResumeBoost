import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  hideLoaderDialog,
  showLoaderDialogWithError,
} from "@/store/slices/loaderDialogSlice";
import { useCallback, useMemo } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import LoaderDialog from "./LoaderDialog";

const FileUploader = ({
  onFileUpload,
}: {
  onFileUpload: (file: File) => void;
}) => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const MAX_FILE_SIZE = useMemo(() => 10 * 1024 * 1024, []); // 10MB

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

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      const rejection = fileRejections[0];

      // Phân tích lỗi và hiển thị thông báo thích hợp
      if (rejection) {
        const errorCode = rejection.errors[0]?.code;

        if (errorCode === "file-too-large") {
          dispatch(
            showLoaderDialogWithError(
              `File quá lớn. Kích thước tối đa cho phép là ${
                MAX_FILE_SIZE / 1024 / 1024
              }MB.`
            )
          );
        } else if (errorCode === "file-invalid-type") {
          dispatch(
            showLoaderDialogWithError(
              "Định dạng file không hỗ trợ. Vui lòng tải lên file PDF."
            )
          );
        } else {
          dispatch(
            showLoaderDialogWithError(
              "File không hợp lệ. Vui lòng kiểm tra và thử lại."
            )
          );
        }

        // Tự động đóng dialog sau 3 giây
        setTimeout(() => {
          dispatch(hideLoaderDialog());
        }, 3000);
      }
    },
    [MAX_FILE_SIZE, dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE, // 10MB
  });

  return (
    <>
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
      <LoaderDialog />
    </>
  );
};

export default FileUploader;
