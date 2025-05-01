import { ColumnDef } from "@tanstack/react-table";
import DataTable from "./DataTable";
import DataTableSection from "./DataTableSection";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import useFetchAdminData from "@/hooks/fetch/useFetchAdminData";
import { UserProfile } from "@/type";

export default function RecentUsersTable() {
  const columns: ColumnDef<UserProfile>[] = [
    {
      accessorKey: "username",
      header: () => (
        <p className="p-0 cursor-pointer text-textDark hover:text-main font-semibold">
          Username
        </p>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-textDark">
          {row.getValue("username")}
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: () => (
        <p className="p-0 cursor-pointer text-textDark hover:text-main font-semibold">
          Vai trò
        </p>
      ),
      cell: ({ row }) => {
        const role = row.getValue("role");

        return role == "admin" ? (
          <span className="font-semibold text-white bg-danger px-2 py-1 rounded-xl w-fit">
            {row.getValue("role")}
          </span>
        ) : (
          <span className="font-medium text-white bg-subMain px-2 py-1 rounded-xl w-fit">
            {row.getValue("role")}
          </span>
        );
      },
    },
    {
      accessorKey: "cvCount",
      header: () => (
        <p className="p-0 cursor-pointer text-textDark hover:text-main font-semibold">
          Số lượng CV
        </p>
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="rounded-full px-2 py-1 text-sm font-medium bg-accent text-main">
            {row.getValue("cvCount")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <p className="p-0 cursor-pointer text-textDark hover:text-main font-semibold">
          Thời gian upload cuối
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
    {
      accessorKey: "updatedAt",
      header: () => (
        <p className="p-0 cursor-pointer text-textDark hover:text-main font-semibold">
          Cập nhật gần nhất
        </p>
      ),
      cell: ({ row }) => (
        <div className="text-textNormal">
          {format(
            (row.getValue("updatedAt") as Timestamp).toDate(),
            "HH:mm dd/MM/yyyy"
          )}
        </div>
      ),
    },
  ];
  const { useUserProfile } = useFetchAdminData();
  const { profiles, loading } = useUserProfile(5, true);

  return (
    <DataTableSection
      title="Người dùng gần đây"
      description="Danh sách người dùng mới đăng ký"
    >
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        </div>
      ) : (
        profiles && <DataTable data={profiles} columns={columns} />
      )}
    </DataTableSection>
  );
}
