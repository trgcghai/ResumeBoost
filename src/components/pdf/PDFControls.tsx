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
    <div className="flex justify-between items-center p-2 bg-gray-100 rounded-t-lg">
      <PageControls
        currentPage={currentPage}
        numPages={numPages}
        changePage={changePage}
      />

      <ViewControls
        scale={scale}
        adjustScale={adjustScale}
        rotateDocument={rotateDocument}
        resetView={resetView}
      />
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
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => changePage(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <span className="text-sm">
        {currentPage} / {numPages || 1}
      </span>

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= numPages}
        onClick={() => changePage(1)}
      >
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
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={scale <= 0.5}
        onClick={() => adjustScale(-0.1)}
      >
        <ZoomOut className="h-4 w-4" />
      </Button>

      <span className="text-sm w-16 text-center">
        {(scale * 100).toFixed(0)}%
      </span>

      <Button
        variant="outline"
        size="sm"
        disabled={scale >= 3}
        onClick={() => adjustScale(0.1)}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="sm" onClick={rotateDocument}>
        <RotateCw className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={resetView}
        title="Đặt lại trạng thái xem"
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PDFControls;
