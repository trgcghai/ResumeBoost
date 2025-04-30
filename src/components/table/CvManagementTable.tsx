import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Download, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import * as XLSX from 'xlsx';
import DataTable from "./DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

// Define the CV type based on the schema
type CV = {
  _id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  createdAt: string;
  updatedAt: string;
};

// Data mẫu ban đầu
const initialCvs: CV[] = [
  {
    _id: "1",
    userId: "user1",
    fileName: "Frontend Developer CV",
    fileUrl: "https://example.com/cv1.pdf",
    fileType: "pdf",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "2",
    userId: "user2",
    fileName: "UX Designer Resume",
    fileUrl: "https://example.com/cv2.pdf",
    fileType: "pdf",
    createdAt: "2024-01-14T09:30:00Z",
    updatedAt: "2024-01-14T09:30:00Z",
  },
  {
    _id: "3",
    userId: "user3",
    fileName: "Backend Engineer CV",
    fileUrl: "https://example.com/cv3.pdf",
    fileType: "pdf",
    createdAt: "2024-02-01T08:00:00Z",
    updatedAt: "2024-02-01T08:00:00Z",
  },
  {
    _id: "4",
    userId: "user4",
    fileName: "Data Analyst CV",
    fileUrl: "https://example.com/cv4.pdf",
    fileType: "pdf",
    createdAt: "2024-03-05T11:20:00Z",
    updatedAt: "2024-03-05T11:20:00Z",
  },
  {
    _id: "5",
    userId: "user5",
    fileName: "Fullstack Dev Resume",
    fileUrl: "https://example.com/cv5.pdf",
    fileType: "pdf",
    createdAt: "2024-02-25T15:30:00Z",
    updatedAt: "2024-02-25T15:30:00Z",
  },
  {
    _id: "6",
    userId: "user6",
    fileName: "AI Researcher CV",
    fileUrl: "https://example.com/cv6.pdf",
    fileType: "pdf",
    createdAt: "2024-01-20T09:10:00Z",
    updatedAt: "2024-01-20T09:10:00Z",
  },
  {
    _id: "7",
    userId: "user7",
    fileName: "QA Tester Resume",
    fileUrl: "https://example.com/cv7.pdf",
    fileType: "pdf",
    createdAt: "2024-04-01T13:45:00Z",
    updatedAt: "2024-04-01T13:45:00Z",
  },
  {
    _id: "8",
    userId: "user8",
    fileName: "Mobile Developer CV",
    fileUrl: "https://example.com/cv8.pdf",
    fileType: "pdf",
    createdAt: "2024-03-12T12:00:00Z",
    updatedAt: "2024-03-12T12:00:00Z",
  },
  {
    _id: "9",
    userId: "user9",
    fileName: "DevOps Engineer CV",
    fileUrl: "https://example.com/cv9.pdf",
    fileType: "pdf",
    createdAt: "2024-03-18T10:25:00Z",
    updatedAt: "2024-03-18T10:25:00Z",
  },
  {
    _id: "10",
    userId: "user10",
    fileName: "Game Developer CV",
    fileUrl: "https://example.com/cv10.pdf",
    fileType: "pdf",
    createdAt: "2024-04-02T14:10:00Z",
    updatedAt: "2024-04-02T14:10:00Z",
  },
  {
    _id: "11",
    userId: "user11",
    fileName: "Cloud Architect Resume",
    fileUrl: "https://example.com/cv11.pdf",
    fileType: "pdf",
    createdAt: "2024-03-28T09:55:00Z",
    updatedAt: "2024-03-28T09:55:00Z",
  },
  {
    _id: "12",
    userId: "user12",
    fileName: "Cybersecurity Expert CV",
    fileUrl: "https://example.com/cv12.pdf",
    fileType: "pdf",
    createdAt: "2024-04-05T08:15:00Z",
    updatedAt: "2024-04-05T08:15:00Z",
  },
  {
    _id: "13",
    userId: "user13",
    fileName: "Blockchain Developer CV",
    fileUrl: "https://example.com/cv13.pdf",
    fileType: "pdf",
    createdAt: "2024-03-14T07:30:00Z",
    updatedAt: "2024-03-14T07:30:00Z",
  },
  {
    _id: "14",
    userId: "user14",
    fileName: "Machine Learning Engineer CV",
    fileUrl: "https://example.com/cv14.pdf",
    fileType: "pdf",
    createdAt: "2024-02-11T16:00:00Z",
    updatedAt: "2024-02-11T16:00:00Z",
  },
  {
    _id: "15",
    userId: "user15",
    fileName: "Business Analyst Resume",
    fileUrl: "https://example.com/cv15.pdf",
    fileType: "pdf",
    createdAt: "2024-03-19T10:30:00Z",
    updatedAt: "2024-03-19T10:30:00Z",
  },
  {
    _id: "16",
    userId: "user16",
    fileName: "Technical Writer CV",
    fileUrl: "https://example.com/cv16.pdf",
    fileType: "pdf",
    createdAt: "2024-02-05T09:50:00Z",
    updatedAt: "2024-02-05T09:50:00Z",
  },
  {
    _id: "17",
    userId: "user17",
    fileName: "Scrum Master Resume",
    fileUrl: "https://example.com/cv17.pdf",
    fileType: "pdf",
    createdAt: "2024-03-01T10:40:00Z",
    updatedAt: "2024-03-01T10:40:00Z",
  },
  {
    _id: "18",
    userId: "user18",
    fileName: "IT Manager CV",
    fileUrl: "https://example.com/cv18.pdf",
    fileType: "pdf",
    createdAt: "2024-01-29T15:15:00Z",
    updatedAt: "2024-01-29T15:15:00Z",
  },
  {
    _id: "19",
    userId: "user19",
    fileName: "Database Admin Resume",
    fileUrl: "https://example.com/cv19.pdf",
    fileType: "pdf",
    createdAt: "2024-02-22T14:20:00Z",
    updatedAt: "2024-02-22T14:20:00Z",
  },
  {
    _id: "20",
    userId: "user20",
    fileName: "Product Manager CV",
    fileUrl: "https://example.com/cv20.pdf",
    fileType: "pdf",
    createdAt: "2024-04-10T11:35:00Z",
    updatedAt: "2024-04-10T11:35:00Z",
  },
  {
    _id: "21",
    userId: "user21",
    fileName: "Product Manager CV",
    fileUrl: "https://example.com/cv20.pdf",
    fileType: "pdf",
    createdAt: "2024-04-10T11:35:00Z",
    updatedAt: "2024-04-10T11:35:00Z",
  },
];

// Key để lưu trong localStorage
const STORAGE_KEY = 'cv_list';

export default function CvManagementTable() {
  const [data, setData] = useState<CV[]>(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      // Nếu không có dữ liệu trong localStorage, lưu dữ liệu mẫu vào
      if (!savedData) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCvs));
        return initialCvs;
      }
      const parsedData = JSON.parse(savedData);
      // Nếu dữ liệu không phải là mảng hoặc mảng rỗng, sử dụng dữ liệu mẫu
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCvs));
        return initialCvs;
      }
      return parsedData;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // Nếu có lỗi, lưu dữ liệu mẫu vào localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCvs));
      return initialCvs;
    }
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sortField, setSortField] = useState("fileName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Cập nhật localStorage mỗi khi data thay đổi
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleDelete = (cvId: string) => {
    const updatedCvs = data.filter((cv) => cv._id !== cvId);
    setData(updatedCvs);
    toast.success("Đã xóa CV thành công");
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setSorting([{ id: field, desc: sortOrder === "asc" }]);
  };

  const columns: ColumnDef<CV>[] = [
    {
      accessorKey: "fileName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => handleSort("fileName")}
          >
            Tên file
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "fileType",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => handleSort("fileType")}
          >
            Loại file
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => handleSort("createdAt")}
          >
            Ngày tạo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return new Date(row.getValue("createdAt")).toLocaleDateString("vi-VN");
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => handleSort("updatedAt")}
          >
            Cập nhật lần cuối
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return new Date(row.getValue("updatedAt")).toLocaleDateString("vi-VN");
      },
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => {
        const cv = row.original;
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
                <AlertDialogDescription>
                  CV "{cv.fileName}" sẽ bị xóa vĩnh viễn và không thể khôi phục.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(cv._id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
  });

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CVs");
    XLSX.writeFile(wb, "cv_list.xlsx");
  };

  const handleReset = () => {
    setGlobalFilter("");
    setColumnFilters([]);
    setSorting([]);
    setSortField("fileName");
    setSortOrder("asc");
  };

  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quản lý CV</CardTitle>
          <Button onClick={handleExportExcel}>
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
        </div>
        <div className="flex items-center justify-between space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Tìm kiếm..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="max-w-sm"
            />
            <Select
              value={sortField}
              onValueChange={(value) => {
                setSortField(value);
                handleSort(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fileName">Tên file</SelectItem>
                <SelectItem value="fileType">Loại file</SelectItem>
                <SelectItem value="createdAt">Ngày tạo</SelectItem>
                <SelectItem value="updatedAt">Ngày cập nhật</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortOrder}
              onValueChange={(value: "asc" | "desc") => {
                setSortOrder(value);
                handleSort(sortField);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Thứ tự sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Tăng dần</SelectItem>
                <SelectItem value="desc">Giảm dần</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <DataTable
            data={table.getRowModel().rows.map(row => row.original)}
            columns={columns}
            tableCellClassName="text-base py-3"
            tableHeadClassName="font-medium"
          />
          <div className="flex items-center justify-between px-4 py-4 border-t">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} CV
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Số dòng mỗi trang</p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Trang đầu</span>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Trang trước</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Trang sau</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Trang cuối</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 