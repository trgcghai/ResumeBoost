import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ColumnDef, SortingFn } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  Search,
  RotateCcw,
  FileDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import DataTable from "./DataTable";
import * as XLSX from "xlsx";

export type UserProfile = {
  _id: string;
  userId: string;
  cvCount: number;
  avgScore: number;
  lastUploadTime: string;
  updatedAt: string;
};

const initialProfiles: UserProfile[] = [
  // ... (giữ nguyên dữ liệu của bạn)
  // Thêm thêm dữ liệu để có ít nhất 7 user
  {
    _id: "1",
    userId: "user_001",
    cvCount: 5,
    avgScore: 82.5,
    lastUploadTime: "2025-04-28T10:30:00Z",
    updatedAt: "2025-04-28T10:35:00Z",
  },
  {
    _id: "2",
    userId: "user_002",
    cvCount: 3,
    avgScore: 75.0,
    lastUploadTime: "2025-04-27T09:15:00Z",
    updatedAt: "2025-04-27T09:20:00Z",
  },
  {
    _id: "3",
    userId: "user_003",
    cvCount: 7,
    avgScore: 88.3,
    lastUploadTime: "2025-04-26T14:45:00Z",
    updatedAt: "2025-04-26T14:50:00Z",
  },
  {
    _id: "4",
    userId: "user_004",
    cvCount: 2,
    avgScore: 65.0,
    lastUploadTime: "2025-04-25T11:20:00Z",
    updatedAt: "2025-04-25T11:25:00Z",
  },
  {
    _id: "5",
    userId: "user_005",
    cvCount: 4,
    avgScore: 79.5,
    lastUploadTime: "2025-04-24T15:10:00Z",
    updatedAt: "2025-04-24T15:15:00Z",
  },
  {
    _id: "6",
    userId: "user_006",
    cvCount: 6,
    avgScore: 91.2,
    lastUploadTime: "2025-04-23T09:45:00Z",
    updatedAt: "2025-04-23T09:50:00Z",
  },
  {
    _id: "7",
    userId: "user_007",
    cvCount: 1,
    avgScore: 60.0,
    lastUploadTime: "2025-04-22T14:30:00Z",
    updatedAt: "2025-04-22T14:35:00Z",
  },
];

// Custom sorting function for strings (userId)
const sortString: SortingFn<UserProfile> = (rowA, rowB, columnId) => {
  const a = rowA.getValue(columnId) as string;
  const b = rowB.getValue(columnId) as string;
  return a.localeCompare(b);
};

// Custom sorting function for numbers (cvCount, avgScore)
const sortNumber: SortingFn<UserProfile> = (rowA, rowB, columnId) => {
  const a = rowA.getValue(columnId) as number;
  const b = rowB.getValue(columnId) as number;
  return a - b;
};

const columns: ColumnDef<UserProfile>[] = [
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <div
        className="cursor-pointer flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        User ID
        {column.getIsSorted() === "asc" && <ArrowUp className="w-4 h-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="w-4 h-4" />}
      </div>
    ),
    sortingFn: sortString, // Use custom string sorting for userId
  },
  {
    accessorKey: "cvCount",
    header: ({ column }) => (
      <div
        className="cursor-pointer flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Số lượng CV
        {column.getIsSorted() === "asc" && <ArrowUp className="w-4 h-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="w-4 h-4" />}
      </div>
    ),
    sortingFn: sortNumber, // Use custom number sorting for cvCount
  },
  {
    accessorKey: "avgScore",
    header: ({ column }) => (
      <div
        className="cursor-pointer flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Điểm trung bình
        {column.getIsSorted() === "asc" && <ArrowUp className="w-4 h-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="w-4 h-4" />}
      </div>
    ),
    sortingFn: sortNumber, // Use custom number sorting for avgScore
  },
  {
    accessorKey: "lastUploadTime",
    header: "Thời gian upload cuối",
  },
  {
    accessorKey: "updatedAt",
    header: "Cập nhật gần nhất",
  },
];

export default function UserProfileTable() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Lọc dữ liệu dựa trên search term
  const filteredData = search
    ? initialProfiles.filter((profile) =>
        profile.userId.toLowerCase().includes(search.toLowerCase())
      )
    : initialProfiles;

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Xử lý tìm kiếm
  const handleSearch = () => {
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  };

  // Xử lý reset
  const handleReset = () => {
    setSearch("");
    setCurrentPage(1); // Reset về trang đầu
  };

  // Xử lý export Excel
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UserProfiles");
    XLSX.writeFile(wb, "user_profiles.xlsx");
  };

  // Chuyển đến trang cụ thể
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Hồ sơ người dùng</CardTitle>
        <p className="text-sm text-muted-foreground">
          Thông tin chi tiết hồ sơ người dùng
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Thanh tìm kiếm và các nút chức năng */}
        <div className="flex items-center gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo User ID..."
            className="max-w-sm"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} variant="default">
            <Search className="mr-1 h-4 w-4" /> Tìm kiếm
          </Button>
          <Button onClick={handleReset} variant="secondary">
            <RotateCcw className="mr-1 h-4 w-4" /> Reset
          </Button>
          <Button onClick={handleExport} variant="outline">
            <FileDown className="mr-1 h-4 w-4" /> Xuất Excel
          </Button>
        </div>

        {/* Bảng dữ liệu */}
        <DataTable data={currentData} columns={columns} />

        {/* Phân trang (chỉ hiển thị nếu có nhiều trang) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-muted-foreground">
              Hiển thị {startIndex + 1}-
              {Math.min(endIndex, filteredData.length)} trên{" "}
              {filteredData.length} kết quả
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                Trang {currentPage}/{totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
