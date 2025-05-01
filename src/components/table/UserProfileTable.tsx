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

import useUserProfileManagement, {
  UserProfile,
} from "@/hooks/useUserProfileManagement";
import useSortingAndFilteringUsers from "@/hooks/useSortingAndFilteringUsers";
import useAlertNotification from "@/hooks/useAlertNotification";
import * as XLSX from "xlsx";

export default function UserProfileTable() {
  // Sử dụng custom hooks
  const {
    data,
    deleteId,
    isDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    handleDelete,
    formatDate,
  } = useUserProfileManagement();

  const { showAlert, alertMessage, showNotification, hideNotification } =
    useAlertNotification();

  // Định nghĩa columns
  const columns = useMemo<ColumnDef<UserProfile>[]>(
    () => [
      {
        accessorKey: "userId",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="p-0 cursor-pointer"
              onClick={() => sortingAndFiltering.handleSort("userId")}
            >
              User ID
            </Button>
          );
        },
      },
      {
        accessorKey: "cvCount",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="p-0 cursor-pointer"
              onClick={() => sortingAndFiltering.handleSort("cvCount")}
            >
              Số lượng CV
            </Button>
          );
        },
      },
      {
        accessorKey: "avgScore",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="p-0 cursor-pointer"
              onClick={() => sortingAndFiltering.handleSort("avgScore")}
            >
              Điểm trung bình
            </Button>
          );
        },
        cell: ({ row }) => {
          return Number(row.getValue("avgScore")).toFixed(1);
        },
      },
      {
        accessorKey: "lastUploadTime",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="p-0 cursor-pointer"
              onClick={() => sortingAndFiltering.handleSort("lastUploadTime")}
            >
              Thời gian upload cuối
            </Button>
          );
        },
        cell: ({ row }) => formatDate(row.getValue("lastUploadTime")),
      },
      {
        accessorKey: "updatedAt",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="p-0 cursor-pointer"
              onClick={() => sortingAndFiltering.handleSort("updatedAt")}
            >
              Cập nhật gần nhất
            </Button>
          );
        },
        cell: ({ row }) => formatDate(row.getValue("updatedAt")),
      },
      {
        id: "actions",
        header: "Thao tác",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <Button
              variant="ghost"
              size="icon"
              className="text-danger px-6 hover:text-danger cursor-pointer"
              onClick={() => openDeleteDialog(user._id)}
            >
              <Trash2 className="h-4 w-4" />
              Xóa
            </Button>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openDeleteDialog, formatDate]
  );

  // Khởi tạo sorting và filtering
  const sortingAndFiltering = useSortingAndFilteringUsers(data, columns);
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

  // Handler cho việc xóa User Profile
  const onDelete = () => {
    if (!deleteId) return;

    const deletedUser = handleDelete(deleteId);
    if (deletedUser) {
      showNotification(
        `Hồ sơ người dùng "${deletedUser.userId}" đã được xóa thành công`,
        "success"
      );
    }
  };

  // Xử lý export Excel
  const handleExport = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "UserProfiles");
      XLSX.writeFile(wb, "user_profiles.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      showNotification("Xuất Excel thất bại", "error");
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
          <SelectItem value="userId">User ID</SelectItem>
          <SelectItem value="cvCount">Số lượng CV</SelectItem>
          <SelectItem value="avgScore">Điểm trung bình</SelectItem>
          <SelectItem value="lastUploadTime">Thời gian upload</SelectItem>
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
      <Button variant="outline" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Xuất Excel
      </Button>
    </div>
  );

  return (
    <div className="relative">
      <DataTableSection
        title="Hồ sơ người dùng"
        description="Danh sách người dùng của hệ thống"
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
              Hồ sơ người dùng này sẽ bị xóa vĩnh viễn và không thể khôi phục.
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
