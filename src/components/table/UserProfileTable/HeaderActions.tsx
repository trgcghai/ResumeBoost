import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, RefreshCw, Search } from "lucide-react";

interface HeaderActionsProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  sortField: string;
  setSortField: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
  handleSort: (field: string) => void;
  handleReset: () => void;
  handleExport: () => void;
}

export function HeaderActions({
  globalFilter,
  setGlobalFilter,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  handleSort,
  handleReset,
  handleExport,
}: HeaderActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-grow max-w-sm">
        <Input
          placeholder="Tìm kiếm..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-9 border-main/30 focus-visible:ring-main/30"
        />
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />
      </div>

      <Select
        value={sortField}
        onValueChange={(value) => {
          setSortField(value);
          handleSort(value);
        }}
      >
        <SelectTrigger className="w-[180px] border-main/30 focus:ring-main/30">
          <SelectValue placeholder="Sắp xếp theo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="username">Username</SelectItem>
          <SelectItem value="cvCount">Số lượng CV</SelectItem>
          <SelectItem value="avgScore">Điểm trung bình</SelectItem>
          <SelectItem value="lastUploadTime">Thời gian upload</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sortOrder}
        onValueChange={(value: "asc" | "desc") => {
          setSortOrder(value);
          handleSort(sortField);
        }}
      >
        <SelectTrigger className="w-[150px] border-main/30 focus:ring-main/30">
          <SelectValue placeholder="Thứ tự sắp xếp" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Tăng dần</SelectItem>
          <SelectItem value="desc">Giảm dần</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={handleReset}
        className="border-main/30 hover:bg-main/5 text-textDark"
      >
        <RefreshCw className="h-4 w-4 mr-1" />
        Reset
      </Button>

      <Button
        variant="default"
        onClick={handleExport}
        className="bg-main hover:bg-mainHover text-white"
      >
        <Download className="h-4 w-4 mr-1" />
        Xuất Excel
      </Button>
    </div>
  );
}
