import { useState, useMemo, useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks/redux";
import { CardData } from "@/type";
import { filterResumesByScore, sortResumes } from "@/utils/ResumeUtil";

export const useResumeDisplay = (resumes: CardData[] | undefined) => {
  const [scoreFilter, setScoreFilter] = useState("all");
  const [orderFilter, setOrderFilter] = useState("uploadDesc");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState<CardData[]>([]);

  // Get UI config from Redux
  const { itemsPerPage, displayMode } = useAppSelector(
    (state) => state.userInterfaceConfig
  );

  // Reference for infinite scroll
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Process and filter resumes
  const processedResumes: CardData[] = useMemo(() => {
    if (!resumes || resumes.length === 0) return [];

    return sortResumes(
      [...filterResumesByScore(resumes, scoreFilter)],
      orderFilter
    );
  }, [resumes, scoreFilter, orderFilter]);

  // Calculate total pages
  const totalPages = Math.ceil(processedResumes.length / itemsPerPage);

  // Update visible items based on pagination settings
  useEffect(() => {
    if (displayMode === "pagination") {
      const startIndex = (currentPage - 1) * itemsPerPage;
      setVisibleItems(
        processedResumes.slice(startIndex, startIndex + itemsPerPage)
      );
    } else {
      // For infinite scroll, show all items up to the current page
      setVisibleItems(processedResumes.slice(0, currentPage * itemsPerPage));
    }
  }, [processedResumes, currentPage, itemsPerPage, displayMode]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [scoreFilter, orderFilter, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    scoreFilter,
    setScoreFilter,
    orderFilter,
    setOrderFilter,
    currentPage,
    setCurrentPage,
    visibleItems,
    processedResumes,
    totalPages,
    handlePageChange,
    bottomRef,
    displayMode,
    itemsPerPage,
  };
};
