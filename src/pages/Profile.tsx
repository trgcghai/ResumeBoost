import React from "react";
import Overview from "../components/OverView";
import CustomBreadcrumb from "@/components/layout/CustomBreadcrumb";
import { useUserResumes } from "@/hooks/fetch/useUserResumes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useResumeDisplay } from "@/hooks/useResumeDisplay";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { FilterControls } from "@/components/profile/FilterControls";
import { ResumeGrid } from "@/components/profile/ResumeGrid";
import { PaginationControls } from "@/components/profile/PaginationControls";

const Profile: React.FC = () => {
  const { data, loading, error } = useUserResumes();

  const {
    scoreFilter,
    setScoreFilter,
    orderFilter,
    setOrderFilter,
    currentPage,
    setCurrentPage,
    visibleItems,
    totalPages,
    handlePageChange,
    bottomRef,
    displayMode,
    itemsPerPage,
  } = useResumeDisplay(data);

  useInfiniteScroll(
    bottomRef,
    currentPage,
    totalPages,
    setCurrentPage,
    displayMode === "infiniteScroll"
  );

  return (
    <>
      <CustomBreadcrumb />
      <div className="p-6 bg-white shadow rounded-lg">
        <Overview />

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Danh sách CV của bạn</h2>

            <div className="flex gap-4 items-center">
              <FilterControls
                scoreFilter={scoreFilter}
                setScoreFilter={setScoreFilter}
                orderFilter={orderFilter}
                setOrderFilter={setOrderFilter}
                itemsPerPage={itemsPerPage}
                displayMode={displayMode}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Lỗi</AlertTitle>
              <AlertDescription>
                Không thể tải dữ liệu CV. Vui lòng thử lại sau.
              </AlertDescription>
            </Alert>
          )}

          <ResumeGrid
            loading={loading}
            visibleItems={visibleItems}
            bottomRef={bottomRef}
            displayMode={displayMode}
            currentPage={currentPage}
            totalPages={totalPages}
            error={error}
          />

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            displayMode={displayMode}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
