import { useState, useEffect, RefObject } from "react";

export function usePDFControls(containerRef: RefObject<HTMLDivElement | null>) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [startPosition, setStartPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Update container width on resize
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);

    return () => window.removeEventListener("resize", updateContainerWidth);
  }, [containerRef]);

  // Reset position when changing pages or scale
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, [currentPage, rotation]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const changePage = (offset: number) => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + offset;
      return newPage >= 1 && newPage <= numPages ? newPage : prevPage;
    });
  };

  const adjustScale = (delta: number) => {
    setScale((prevScale) => {
      const newScale = parseFloat((prevScale + delta).toFixed(1));
      return newScale >= 0.5 && newScale <= 3 ? newScale : prevScale;
    });
  };

  const rotateDocument = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsPanning(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    setPosition({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleMouseLeave = () => {
    setIsPanning(false);
  };

  const resetView = () => {
    setCurrentPage(1);
    setScale(1.0);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  return {
    numPages,
    currentPage,
    scale,
    rotation,
    isPanning,
    position,
    loading,
    containerWidth,
    onDocumentLoadSuccess,
    changePage,
    adjustScale,
    rotateDocument,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    resetView,
  };
}
