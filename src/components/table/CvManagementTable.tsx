import { useMemo } from "react";
import { Trash2, Check, Download, Search, RefreshCw } from "lucide-react";
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
import useExcel from "@/hooks/useExportExcel";

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
  const { exportExcel } = useExcel();
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
              className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
              onClick={() => sortingAndFiltering.handleSort("fileName")}
            >
              Tên file
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="font-medium text-textDark">
              {row.getValue("fileName")}
            </div>
          );
        },
      },
      {
        accessorKey: "fileType",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
              onClick={() => sortingAndFiltering.handleSort("fileType")}
            >
              Loại file
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="flex items-center">
              <span className="rounded-full px-2 py-1 text-sm font-medium bg-accent text-accent-foreground">
                {row.getValue("fileType")}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
              onClick={() => sortingAndFiltering.handleSort("createdAt")}
            >
              Ngày tạo
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="text-textNormal">
              {new Date(row.getValue("createdAt")).toLocaleDateString("vi-VN")}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: () => (
          <Button
            variant="ghost"
            className="text-right text-textDark font-semibold"
          >
            Thao tác
          </Button>
        ),
        cell: ({ row }) => {
          const cv = row.original;
          return (
            <Button
              variant="ghost"
              size="sm"
              className="text-danger hover:bg-red-50 hover:text-danger cursor-pointer"
              onClick={() => openDeleteDialog(cv._id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
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
      const formattedData = data.map((cv) => ({
        "Tên file": cv.fileName,
        "Loại file": cv.fileType,
        "Ngày tạo": new Date(cv.createdAt).toLocaleDateString("vi-VN"),
      }));
      exportExcel(formattedData, "cvs");
    } catch (error) {
      showNotification("Có lỗi khi xuất Excel", "error");
      console.error("Excel export error:", error);
    }
  };

  // Render header actions
  const headerActions = (
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
          sortingAndFiltering.handleSort(value);
        }}
      >
        <SelectTrigger className="w-[180px] border-main/30 focus:ring-main/30">
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
        onClick={handleExportExcel}
        className="bg-main hover:bg-mainHover text-white"
      >
        <Download className="h-4 w-4 mr-1" />
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
        <div className="rounded-md border border-border bg-card shadow-sm">
          <DataTable
            data={table.getRowModel().rows.map((row) => row.original)}
            columns={columns}
            tableCellClassName="text-base py-3"
            tableHeadClassName="bg-muted/50"
          />
        </div>
      </DataTableSection>

      {/* Dialog xác nhận xóa */}
      <Dialog open={isDialogOpen} onOpenChange={closeDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-textDark">
              Bạn có chắc chắn muốn xóa?
            </DialogTitle>
            <DialogDescription className="text-textNormal">
              CV này sẽ bị xóa vĩnh viễn và không thể khôi phục.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeDeleteDialog}
              className="border-main/30 hover:bg-main/5"
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={onDelete}
              className="bg-danger hover:bg-danger/80"
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog thông báo thành công */}
      <Dialog open={showAlert} onOpenChange={hideNotification}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-greenText">
              <Check className="h-5 w-5" /> Thành công
            </DialogTitle>
            <DialogDescription className="text-textDark">
              {alertMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              variant="default"
              className="bg-main hover:bg-mainHover text-white"
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
