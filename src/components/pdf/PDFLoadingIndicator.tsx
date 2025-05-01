import { Loader } from "lucide-react";

const PDFLoadingIndicator: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
      <div className="flex flex-col items-center">
        <Loader className="h-8 w-8 animate-spin text-main" />
        <p className="mt-2 text-sm text-main">Đang tải PDF...</p>
      </div>
    </div>
  );
};

export default PDFLoadingIndicator;
