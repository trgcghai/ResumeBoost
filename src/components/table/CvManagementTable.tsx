import { useMemo } from "react";
import { Trash2, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "./DataTable";
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

import useCvManagement, { CV } from "@/hooks/useCvManagement";
import useSortingAndFiltering from "@/hooks/useSortingAndFiltering";
import useAlertNotification from "@/hooks/useAlertNotification";
import * as XLSX from "xlsx";

export default function CvManagementTable() {
  // Sử dụng custom hooks
  const {
    data,
    deleteId,
    isDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    handleDelete,
  } = useCvManagement();

  const { showAlert, alertMessage, showNotification, hideNotification } =
    useAlertNotification();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: any = useMemo<ColumnDef<CV>[]>(
    () => [
      {
        accessorKey: "fileName",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="p-0 cursor-pointer"
              onClick={() => sortingAndFiltering.handleSort("fileName")}
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
              onClick={() => sortingAndFiltering.handleSort("fileType")}
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
              onClick={() => sortingAndFiltering.handleSort("createdAt")}
            >
              Ngày tạo
            </Button>
          );
        },
        cell: ({ row }) => {
          return new Date(row.getValue("createdAt")).toLocaleDateString(
            "vi-VN"
          );
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
              className="text-danger px-6 hover:text-danger cursor-pointer"
              onClick={() => openDeleteDialog(cv._id)}
            >
              <Trash2 className="h-4 w-4" />
              Xóa
            </Button>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openDeleteDialog]
  );

  // Initialize sorting and filtering after columns are defined
  const sortingAndFiltering = useSortingAndFiltering(data, columns);
  const {
    table,
    globalFilter,
    setGlobalFilter,
    sortField,
    sortOrder,
    setSortField,
    setSortOrder,
    handleReset,
  } = sortingAndFiltering;

  // Handler cho việc xóa CV
  const onDelete = () => {
    if (!deleteId) return;

    const deletedCv = handleDelete(deleteId);
    if (deletedCv) {
      showNotification(
        `CV "${deletedCv.fileName}" đã được xóa thành công`,
        "success"
      );
    }
  };

  // Handler for exporting to Excel
  const handleExportExcel = () => {
    try {
      // Format data for export
      const exportData = data.map((cv) => ({
        "Tên file": cv.fileName,
        "Loại file": cv.fileType,
        "Ngày tạo": new Date(cv.createdAt).toLocaleDateString("vi-VN"),
        "Ngày cập nhật": new Date(cv.updatedAt).toLocaleDateString("vi-VN"),
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "CVs");
      XLSX.writeFile(workbook, "cvs.xlsx");
    } catch (error) {
      showNotification("Có lỗi khi xuất Excel", "error");
      console.error("Excel export error:", error);
    }
  };

  // Render header actions
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
          sortingAndFiltering.handleSort(value);
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
          sortingAndFiltering.handleSort(sortField);
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
      <Button variant="outline" onClick={handleExportExcel}>
        <Download className="mr-2 h-4 w-4" />
        Xuất Excel
      </Button>
    </div>
  );

  return (
    <div className="relative">
      <DataTableSection
        title="Quản lý CV"
        description="Danh sách CV tải lên của người dùng"
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
      <Dialog open={isDialogOpen} onOpenChange={closeDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn có chắc chắn muốn xóa?</DialogTitle>
            <DialogDescription>
              CV này sẽ bị xóa vĩnh viễn và không thể khôi phục.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteDialog}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog thông báo thành công */}
      <Dialog open={showAlert} onOpenChange={hideNotification}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <Check className="h-5 w-5" /> Thành công
            </DialogTitle>
            <DialogDescription>{alertMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={hideNotification}
            >
              Đồng ý
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
