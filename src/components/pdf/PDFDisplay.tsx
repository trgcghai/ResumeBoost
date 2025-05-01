import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useRef } from "react";
import PDFLoadingIndicator from "./PDFLoadingIndicator";
import PDFCanvas from "./PDFCanvas";
import PDFControls from "./PDFControls";
import { usePDFControls } from "@/hooks/usePDFControls";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type PDFDisplayProps = {
  file: string;
};

const PDFDisplay: React.FC<PDFDisplayProps> = ({ file }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfControls = usePDFControls(containerRef);

  return (
    <div className="flex flex-col h-full" ref={containerRef}>
      <PDFControls
        currentPage={pdfControls.currentPage}
        numPages={pdfControls.numPages}
        scale={pdfControls.scale}
        changePage={pdfControls.changePage}
        adjustScale={pdfControls.adjustScale}
        rotateDocument={pdfControls.rotateDocument}
        resetView={pdfControls.resetView}
      />

      <div className="overflow-hidden bg-gray-200 flex-grow rounded-b-lg relative">
        {pdfControls.loading && <PDFLoadingIndicator />}

        <PDFCanvas
          file={file}
          containerWidth={pdfControls.containerWidth}
          currentPage={pdfControls.currentPage}
          scale={pdfControls.scale}
          rotation={pdfControls.rotation}
          position={pdfControls.position}
          isPanning={pdfControls.isPanning}
          onMouseDown={pdfControls.handleMouseDown}
          onMouseMove={pdfControls.handleMouseMove}
          onMouseUp={pdfControls.handleMouseUp}
          onMouseLeave={pdfControls.handleMouseLeave}
          onDocumentLoadSuccess={pdfControls.onDocumentLoadSuccess}
        />
      </div>
    </div>
  );
};

export default PDFDisplay;
