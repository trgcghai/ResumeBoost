import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/redux";
import {
  setDisplayMode,
  setItemsPerPage,
} from "@/store/slices/userInterfaceConfigSlice";

interface FilterControlsProps {
  scoreFilter: string;
  setScoreFilter: (value: string) => void;
  orderFilter: string;
  setOrderFilter: (value: string) => void;
  itemsPerPage: number;
  displayMode: "pagination" | "infiniteScroll";
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  scoreFilter,
  setScoreFilter,
  orderFilter,
  setOrderFilter,
  itemsPerPage,
  displayMode,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2`}>
      <div className="">
        <Select value={scoreFilter} onValueChange={setScoreFilter}>
          <SelectTrigger className="w-full sm:w-[180px] md:w-[200px]">
            <SelectValue placeholder="Lọc theo điểm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="high">Điểm cao (90+)</SelectItem>
            <SelectItem value="average">Điểm trung bình (70-90)</SelectItem>
            <SelectItem value="low">Điểm thấp (&lt;70)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="">
        <Select value={orderFilter} onValueChange={setOrderFilter}>
          <SelectTrigger className="w-full sm:w-[180px] md:w-[200px]">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uploadDesc">Ngày tải lên giảm dần</SelectItem>
            <SelectItem value="uploadAsc">Ngày tải lên tăng dần</SelectItem>
            <SelectItem value="scoreDesc">Điểm giảm dần</SelectItem>
            <SelectItem value="scoreAsc">Điểm tăng dần</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        className={`${
          displayMode === "pagination" ? "" : "sm:col-span-1 md:col-span-2"
        }`}
      >
        <Select
          value={displayMode}
          onValueChange={(value) =>
            dispatch(setDisplayMode(value as "pagination" | "infiniteScroll"))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Kiểu hiển thị" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pagination">Phân trang</SelectItem>
            <SelectItem value="infiniteScroll">Cuộn vô hạn</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {displayMode === "pagination" && (
        <div className="">
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => dispatch(setItemsPerPage(Number(value)))}
          >
            <SelectTrigger className="w-full sm:w-[180px] md:w-[200px]">
              <SelectValue placeholder="Số lượng mỗi trang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6 mỗi trang</SelectItem>
              <SelectItem value="9">9 mỗi trang</SelectItem>
              <SelectItem value="12">12 mỗi trang</SelectItem>
              <SelectItem value="15">15 mỗi trang</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
