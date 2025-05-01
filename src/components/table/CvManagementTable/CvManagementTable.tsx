import useCvManagement from "@/hooks/useCvManagement";
import useSortingAndFiltering from "@/hooks/useSortingAndFiltering";
import useAlertNotification from "@/hooks/useAlertNotification";
import useExcel from "@/hooks/useExportExcel";
import { getColumnsConfig } from "./ColumnsConfig";
import DataTableSection from "../DataTableSection";
import { HeaderActions } from "./HeaderActions";
import DataTable from "../DataTable";
import { DeleteConfirmationDialog } from "../shared/DeleteConfirmationDialog";
import { SuccessNotificationDialog } from "../shared/SuccessNotificationDialog";
import { Resume } from "@/type";
import { format } from "date-fns";

export default function CvManagementTable({ resumes }: { resumes: Resume[] }) {
  const {
    data,
    deleteId,
    isDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    handleDelete,
    formatDate,
  } = useCvManagement(resumes);
  const { exportExcel } = useExcel();
  const { showAlert, alertMessage, showNotification, hideNotification } =
    useAlertNotification();

  const columns = getColumnsConfig({
    openDeleteDialog,
    handleSort: (field: string) => sortingAndFiltering.handleSort(field),
    formatDate,
  });

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

  // Handlers
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

  const handleExportExcel = () => {
    try {
      const formattedData = data.map((cv: Resume) => ({
        "Tên file": cv.fileName,
        "Loại file": cv.format,
        "Ngày tạo": format(cv.createdAt.toDate(), "dd/MM/yyyy"),
      }));
      exportExcel(formattedData, "cvs");
    } catch (error) {
      showNotification("Có lỗi khi xuất Excel", "error");
      console.error("Excel export error:", error);
    }
  };

  return (
    <div className="relative">
      <DataTableSection
        title="Quản lý CV"
        description="Danh sách CV tải lên của người dùng"
        headerActions={
          <HeaderActions
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            sortField={sortField}
            setSortField={setSortField}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            handleSort={sortingAndFiltering.handleSort}
            handleReset={handleReset}
            handleExportExcel={handleExportExcel}
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
        onConfirm={onDelete}
        message="Bạn có chắc chắn muốn xóa CV này không?"
      />

      <SuccessNotificationDialog
        isOpen={showAlert}
        message={alertMessage}
        onClose={hideNotification}
      />
    </div>
  );
}
