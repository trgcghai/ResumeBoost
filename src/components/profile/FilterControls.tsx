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
    <div className="flex flex-wrap gap-4 items-center">
      <Select value={scoreFilter} onValueChange={setScoreFilter}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Lọc theo điểm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="high">Điểm cao (90+)</SelectItem>
          <SelectItem value="average">Điểm trung bình (70-90)</SelectItem>
          <SelectItem value="low">Điểm thấp (&lt;70)</SelectItem>
        </SelectContent>
      </Select>

      <Select value={orderFilter} onValueChange={setOrderFilter}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sắp xếp theo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="uploadDesc">Ngày tải lên giảm dần</SelectItem>
          <SelectItem value="uploadAsc">Ngày tải lên tăng dần</SelectItem>
          <SelectItem value="scoreDesc">Điểm giảm dần</SelectItem>
          <SelectItem value="scoreAsc">Điểm tăng dần</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={displayMode}
        onValueChange={(value) =>
          dispatch(setDisplayMode(value as "pagination" | "infiniteScroll"))
        }
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Kiểu hiển thị" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pagination">Phân trang</SelectItem>
          <SelectItem value="infiniteScroll">Cuộn vô hạn</SelectItem>
        </SelectContent>
      </Select>

      {displayMode === "pagination" && (
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => dispatch(setItemsPerPage(Number(value)))}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Số lượng mỗi trang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">6 mỗi trang</SelectItem>
            <SelectItem value="9">9 mỗi trang</SelectItem>
            <SelectItem value="12">12 mỗi trang</SelectItem>
            <SelectItem value="15">15 mỗi trang</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
