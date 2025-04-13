import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({
  onFileUpload,
}: {
  onFileUpload: (file: File) => void;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
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
            htmlFor="file"
            className="mt-2 bg-main text-white px-4 py-2 my-2 inline-block rounded hover:bg-mainHover"
            onClick={(e) => e.stopPropagation()}
          >
            Tìm kiếm file
          </label>
          <input type="file" className="hidden" name="" id="file" />
          <p className="text-xs text-gray-500 mt-2">
            Hỗ trợ: PDF, DOC, DOCX (Tối đa 5MB)
          </p>
        </>
      )}
    </div>
  );
};

export default FileUploader;
