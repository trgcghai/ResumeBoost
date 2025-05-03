import React from "react";
import Card from "@/components/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { CardData } from "@/type";

interface ResumeGridProps {
  loading: boolean;
  visibleItems: CardData[];
  bottomRef: React.RefObject<HTMLDivElement | null>;
  displayMode: "pagination" | "infiniteScroll";
  currentPage: number;
  totalPages: number;
  error: Error | null;
}

export const ResumeGrid: React.FC<ResumeGridProps> = ({
  loading,
  visibleItems,
  bottomRef,
  displayMode,
  currentPage,
  totalPages,
  error,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {loading &&
        Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="border rounded-lg p-3 md:p-4"
            >
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-16 md:h-20 w-full rounded-md" />
            </div>
          ))}

      {visibleItems.length > 0
        ? visibleItems.map((resume) => (
            <Card
              key={resume.resumeId}
              id={resume.analysisId}
              title={resume.title}
              uploadTime={resume.uploadTime}
              score={resume.avgScore}
            />
          ))
        : !loading &&
          !error && (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Không có resume nào !!</p>
            </div>
          )}

      {displayMode === "infiniteScroll" && currentPage < totalPages && (
        <div
          ref={bottomRef}
          className="col-span-full h-10 flex items-center justify-center"
        >
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      )}
    </div>
  );
};
