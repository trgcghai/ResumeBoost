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

import useUserProfileManagement, {
  UserProfile,
} from "@/hooks/useUserProfileManagement";
import useSortingAndFilteringUsers from "@/hooks/useSortingAndFilteringUsers";
import useAlertNotification from "@/hooks/useAlertNotification";
import useExcel from "@/hooks/useExportExcel";

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
  const { exportExcel } = useExcel();
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
              className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
              onClick={() => sortingAndFiltering.handleSort("userId")}
            >
              User ID
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="font-medium text-textDark">
              {row.getValue("userId")}
            </div>
          );
        },
      },
      {
        accessorKey: "cvCount",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
              onClick={() => sortingAndFiltering.handleSort("cvCount")}
            >
              Số lượng CV
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="flex items-center">
              <span className="rounded-full px-2 py-1 text-sm font-medium bg-accent text-main">
                {row.getValue("cvCount")}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "avgScore",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
              onClick={() => sortingAndFiltering.handleSort("avgScore")}
            >
              Điểm trung bình
            </Button>
          );
        },
        cell: ({ row }) => {
          const score = Number(row.getValue("avgScore"));
          let colorClass = "bg-greenBgLight text-greenText";

          if (score < 70) {
            colorClass = "bg-redBgLight text-redText";
          } else if (score < 85) {
            colorClass = "bg-yellowBgLight text-yellowText";
          }

          return (
            <div
              className={`inline-block rounded-full px-2 py-1 text-sm font-medium ${colorClass}`}
            >
              {score.toFixed(1)}
            </div>
          );
        },
      },
      {
        accessorKey: "lastUploadTime",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
              onClick={() => sortingAndFiltering.handleSort("lastUploadTime")}
            >
              Thời gian upload cuối
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="text-textNormal">
            {formatDate(row.getValue("lastUploadTime"))}
          </div>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: () => {
          return (
            <Button
              variant="ghost"
              className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
              onClick={() => sortingAndFiltering.handleSort("updatedAt")}
            >
              Cập nhật gần nhất
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="text-textNormal">
            {formatDate(row.getValue("updatedAt"))}
          </div>
        ),
      },
      {
        id: "actions",
        header: () => (
          <Button
            variant="ghost"
            className="text-left text-textDark font-semibold p-2"
          >
            Thao tác
          </Button>
        ),
        cell: ({ row }) => {
          const user = row.original;
          return (
            <Button
              variant="ghost"
              size="sm"
              className="text-danger hover:bg-red-50 hover:text-danger cursor-pointer"
              onClick={() => openDeleteDialog(user._id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
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
      // Format data for export
      const exportData = data.map((user) => ({
        "User ID": user.userId,
        "Số lượng CV": user.cvCount,
        "Điểm trung bình": Number(user.avgScore).toFixed(1),
        "Thời gian upload cuối": formatDate(user.lastUploadTime),
        "Cập nhật gần nhất": formatDate(user.updatedAt),
      }));

      exportExcel(exportData, "user_profiles");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      showNotification("Xuất Excel thất bại", "error");
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

  return (
    <div className="relative">
      <DataTableSection
        title="Hồ sơ người dùng"
        description="Thông tin chi tiết hồ sơ người dùng"
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
              Hồ sơ người dùng này sẽ bị xóa vĩnh viễn và không thể khôi phục.
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
