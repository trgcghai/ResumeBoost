import { ColumnDef } from "@tanstack/react-table";
import DataTable from "./DataTable";
import DataTableSection from "./DataTableSection";
import { Resume } from "@/type";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import useFetchAdminData from "@/hooks/fetch/useFetchAdminData";

export default function RecentCvsTable() {
  const columns: ColumnDef<Resume>[] = [
    {
      accessorKey: "fileName",
      header: () => (
        <p className="p-0 cursor-pointer text-textDark hover:text-main font-semibold">
          Tên file
        </p>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-textDark">
          {(row.getValue("fileName") as string).replace(/\.[^.]+$/, "")}
        </div>
      ),
    },
    {
      accessorKey: "username",
      accessorFn: (row) => row.user?.username || "",
      header: () => (
        <p className="p-0 cursor-pointer text-textDark hover:text-main font-semibold">
          Chủ sở hữu
        </p>
      ),
      cell: ({ row }) => {
        return (
          <div className="font-medium text-textDark">
            {row.original.user.username}
          </div>
        );
      },
    },
    {
      accessorKey: "format",
      header: () => (
        <p className="p-0 cursor-pointer text-textDark hover:text-main font-semibold">
          Loại file
        </p>
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="rounded-full px-2 py-1 text-sm font-medium bg-accent text-accent-foreground">
            {row.getValue("format")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <p className="p-0 cursor-pointer text-textDark hover:text-main font-semibold">
          Ngày tạo
        </p>
      ),
      cell: ({ row }) => (
        <div className="text-textNormal">
          {format(
            (row.getValue("createdAt") as Timestamp).toDate(),
            "HH:mm dd/MM/yyyy"
          )}
        </div>
      ),
    },
  ];

  const { useResume } = useFetchAdminData();
  const { resumes, loading } = useResume(5, true);

  return (
    <DataTableSection
      title="CV gần đây"
      description="Danh sách CV mới được tải lên"
    >
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        </div>
      ) : (
        resumes && <DataTable columns={columns} data={resumes} />
      )}
    </DataTableSection>
  );
}
