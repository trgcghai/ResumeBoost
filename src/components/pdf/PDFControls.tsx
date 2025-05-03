import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RefreshCw,
} from "lucide-react";

interface PDFControlsProps {
  currentPage: number;
  numPages: number;
  scale: number;
  changePage: (offset: number) => void;
  adjustScale: (delta: number) => void;
  rotateDocument: () => void;
  resetView: () => void;
}

const PDFControls: React.FC<PDFControlsProps> = ({
  currentPage,
  numPages,
  scale,
  changePage,
  adjustScale,
  rotateDocument,
  resetView,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 p-2 bg-gray-100 rounded-t-lg">
      <div className="flex justify-center sm:justify-start">
        <PageControls
          currentPage={currentPage}
          numPages={numPages}
          changePage={changePage}
        />
      </div>

      <div className="flex justify-center sm:justify-end">
        <ViewControls
          scale={scale}
          adjustScale={adjustScale}
          rotateDocument={rotateDocument}
          resetView={resetView}
        />
      </div>
    </div>
  );
};

interface PageControlsProps {
  currentPage: number;
  numPages: number;
  changePage: (offset: number) => void;
}

const PageControls: React.FC<PageControlsProps> = ({
  currentPage,
  numPages,
  changePage,
}) => {
  return (
    <div className="w-full flex items-center space-x-1 sm:space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0 sm:h-9 sm:w-9 flex-1 sm:flex-none"
        disabled={currentPage <= 1}
        onClick={() => changePage(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sm:hidden">Trang trước</span>
      </Button>

      <span className="text-xs sm:text-sm min-w-[60px] text-center">
        {currentPage} / {numPages || 1}
      </span>

      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0 sm:h-9 sm:w-9 flex-1 sm:flex-none"
        disabled={currentPage >= numPages}
        onClick={() => changePage(1)}
      >
        <span className="sm:hidden">Trang sau</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

interface ViewControlsProps {
  scale: number;
  adjustScale: (delta: number) => void;
  rotateDocument: () => void;
  resetView: () => void;
}

const ViewControls: React.FC<ViewControlsProps> = ({
  scale,
  adjustScale,
  rotateDocument,
  resetView,
}) => {
  return (
    <div className="w-full flex justify-between sm:justify-normal sm:space-x-2">
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 sm:h-9 sm:w-9"
          disabled={scale <= 0.5}
          onClick={() => adjustScale(-0.1)}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>

        <span className="text-xs sm:text-sm min-w-[50px] text-center">
          {(scale * 100).toFixed(0)}%
        </span>

        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 sm:h-9 sm:w-9"
          disabled={scale >= 3}
          onClick={() => adjustScale(0.1)}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 sm:h-9 sm:w-9"
          onClick={rotateDocument}
        >
          <RotateCw className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 sm:h-9 sm:w-9"
          onClick={resetView}
          title="Đặt lại trạng thái xem"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PDFControls;
