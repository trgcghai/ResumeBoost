import useUserProfileManagement from "@/hooks/useUserProfileManagement";
import useSortingAndFilteringUsers from "@/hooks/useSortingAndFilteringUsers";
import useAlertNotification from "@/hooks/useAlertNotification";
import useExcel from "@/hooks/useExportExcel";
import DataTableSection from "../DataTableSection";
import { HeaderActions } from "./HeaderActions";
import DataTable from "../DataTable";
import { DeleteConfirmationDialog } from "../shared/DeleteConfirmationDialog";
import { SuccessNotificationDialog } from "../shared/SuccessNotificationDialog";
import { UserProfile } from "@/type";
import { getColumnsConfig } from "./ColumnsConfig";

export default function UserProfileTable({
  profiles,
}: {
  profiles: UserProfile[];
}) {
  // Hooks
  const {
    data,
    deleteId,
    isDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    handleDelete,
  } = useUserProfileManagement(profiles);
  const { exportExcel } = useExcel();
  const { showAlert, alertMessage, showNotification, hideNotification } =
    useAlertNotification();

  // Table columns
  const columns = getColumnsConfig({
    openDeleteDialog,
    handleSort: (field: string) => handleSort(field),
  });

  // Sorting and filtering
  const {
    table,
    globalFilter,
    setGlobalFilter,
    sortField,
    sortOrder,
    setSortField,
    setSortOrder,
    handleReset,
    handleSort,
  } = useSortingAndFilteringUsers(data, columns);

  const handleExport = () => {
    try {
      const exportData = data.map((user: UserProfile) => ({
        "User ID": user.userId,
        "Số lượng CV": user.cvCount,
        "Điểm trung bình": Number(user.avgScore).toFixed(1),
        "Thời gian upload cuối": user.lastUploadTime,
        "Cập nhật gần nhất": user.updatedAt,
      }));

      exportExcel(exportData, "user_profiles");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      showNotification("Xuất Excel thất bại", "error");
    }
  };

  return (
    <div className="relative">
      <DataTableSection
        title="Hồ sơ người dùng"
        description="Thông tin chi tiết hồ sơ người dùng"
        headerActions={
          <HeaderActions
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            sortField={sortField}
            setSortField={setSortField}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            handleSort={handleSort}
            handleReset={handleReset}
            handleExport={handleExport}
          />
        }
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

      <DeleteConfirmationDialog
        isOpen={isDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={() => {
          handleDelete(deleteId || "");
        }}
        message="Bạn có chắc chắn muốn xóa hồ sơ người dùng này không?"
      />

      <SuccessNotificationDialog
        isOpen={showAlert}
        message={alertMessage}
        onClose={hideNotification}
      />
    </div>
  );
}
