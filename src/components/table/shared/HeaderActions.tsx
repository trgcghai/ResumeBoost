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
  handleExportExcel: () => void;
  sortOptions: {
    label: string;
    value: string;
  }[];
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
  handleExportExcel,
  sortOptions,
}: HeaderActionsProps) {
  return (
    <div className="space-y-3 md:space-y-0 md:flex md:items-center md:gap-3 flex-wrap">
      <div className="relative w-full md:w-auto md:flex-grow md:max-w-md">
        <Input
          placeholder="Tìm kiếm..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-9 border-main/30 focus-visible:ring-main/30"
        />
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="w-full sm:w-auto">
          <Select
            value={sortField}
            onValueChange={(value) => {
              setSortField(value);
              handleSort(value);
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px] border-main/30 focus:ring-main/30">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-auto">
          <Select
            value={sortOrder}
            onValueChange={(value: "asc" | "desc") => {
              setSortOrder(value);
              handleSort(sortField);
            }}
          >
            <SelectTrigger className="w-full sm:w-[150px] border-main/30 focus:ring-main/30">
              <SelectValue placeholder="Thứ tự sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Tăng dần</SelectItem>
              <SelectItem value="desc">Giảm dần</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-auto flex gap-2 mt-2 sm:mt-0">
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-main/30 hover:bg-main/5 text-textDark flex-1 sm:flex-none"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            <span>Reset</span>
          </Button>

          <Button
            variant="default"
            onClick={handleExportExcel}
            className="bg-main hover:bg-mainHover text-white flex-1 sm:flex-none"
          >
            <Download className="h-4 w-4 mr-1" />
            <span>Xuất Excel</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
