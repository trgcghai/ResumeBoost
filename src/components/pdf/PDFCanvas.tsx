import { Document, Page } from "react-pdf";

interface PDFCanvasProps {
  file: string;
  containerWidth: number;
  currentPage: number;
  scale: number;
  rotation: number;
  position: { x: number; y: number };
  isPanning: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
}

const PDFCanvas: React.FC<PDFCanvasProps> = ({
  file,
  containerWidth,
  currentPage,
  scale,
  rotation,
  position,
  isPanning,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onDocumentLoadSuccess,
}) => {
  const pageWidth = containerWidth ? containerWidth - 40 : 612;

  const canvasStyle = {
    cursor: isPanning ? "grabbing" : "grab",
  };

  const documentStyle = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
    transformOrigin: "center center",
    transition: isPanning ? "none" : "transform 100ms ease-out",
  };

  return (
    <div
      className="h-full flex items-center justify-center"
      style={canvasStyle}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="flex justify-center items-center min-h-[500px]"
        style={documentStyle}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={null}
        >
          <Page
            pageNumber={currentPage}
            width={pageWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFCanvas;
