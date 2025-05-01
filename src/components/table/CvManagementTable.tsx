import { useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, X, Check } from "lucide-react";
import DataTable from "./DataTable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DataTableSection from "./DataTableSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
];

export default function CvManagementTable() {
  const [data, setData] = useState<CV[]>(initialCvs);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sortField, setSortField] = useState("fileName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State cho Alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Tự động ẩn Alert sau 3 giây
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleDelete = (cvId: string) => {
    const cvToDelete = data.find((cv) => cv._id === cvId);
    const updatedCvs = data.filter((cv) => cv._id !== cvId);
    setData(updatedCvs);
    setIsDialogOpen(false);

    // Hiển thị thông báo thành công
    setAlertMessage(
      `CV "${cvToDelete?.fileName || ""}" đã được xóa thành công`
    );
    setShowAlert(true);
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
      header: () => {
        return (
          <Button
            variant="ghost"
            className="p-0 cursor-pointer"
            onClick={() => handleSort("fileName")}
          >
            Tên file
          </Button>
        );
      },
    },
    {
      accessorKey: "fileType",
      header: () => {
        return (
          <Button
            variant="ghost"
            className="p-0 cursor-pointer"
            onClick={() => handleSort("fileType")}
          >
            Loại file
          </Button>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => {
        return (
          <Button
            variant="ghost"
            className="p-0 cursor-pointer"
            onClick={() => handleSort("createdAt")}
          >
            Ngày tạo
          </Button>
        );
      },
      cell: ({ row }) => {
        return new Date(row.getValue("createdAt")).toLocaleDateString("vi-VN");
      },
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => {
        const cv = row.original;
        return (
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => {
              setDeleteId(cv._id);
              setIsDialogOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
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
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const handleReset = () => {
    setGlobalFilter("");
    setColumnFilters([]);
    setSorting([]);
    setSortField("fileName");
    setSortOrder("asc");
  };

  // Define header actions component
  const headerActions = (
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
        </SelectContent>
      </Select>
      <Select
        value={sortOrder}
        onValueChange={(value: "asc" | "desc") => {
          setSortOrder(value);
          handleSort(sortField);
        }}
      >
        <SelectTrigger className="w-[150px]">
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
  );

  return (
    <div className="relative">
      {showAlert && (
        <div className="absolute top-4 right-4 z-50 w-72">
          <Alert
            variant="default"
            className="bg-green-50 border-green-200 flex items-center justify-between"
          >
            <Check className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-600 flex-1">
              {alertMessage}
            </AlertDescription>
            <Button
              variant="ghost"
              className="h-4 w-4 p-0 text-green-500 hover:bg-green-100"
              onClick={() => setShowAlert(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        </div>
      )}

      <DataTableSection
        title="Quản lý CV"
        description="Danh sách CV được tải lên của người dùng"
        headerActions={headerActions}
      >
        <div className="rounded-md border">
          <DataTable
            data={table.getRowModel().rows.map((row) => row.original)}
            columns={columns}
            tableCellClassName="text-base py-3"
            tableHeadClassName="font-medium"
          />
        </div>
      </DataTableSection>

      {/* Dialog xác nhận xóa */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn có chắc chắn muốn xóa?</DialogTitle>
            <DialogDescription>
              CV này sẽ bị xóa vĩnh viễn và không thể khôi phục.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
