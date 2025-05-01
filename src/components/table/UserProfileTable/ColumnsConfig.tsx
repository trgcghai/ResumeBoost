// src/components/UserProfileTable/columnsConfig.ts
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { UserProfile } from "@/hooks/useUserProfileManagement";

interface ColumnsConfigProps {
  openDeleteDialog: (id: string) => void;
  handleSort: (field: string) => void;
  formatDate: (date: string) => string;
}

export const getColumnsConfig = ({
  openDeleteDialog,
  handleSort,
  formatDate,
}: ColumnsConfigProps): ColumnDef<UserProfile>[] => [
  {
    accessorKey: "userId",
    header: () => (
      <Button
        variant="ghost"
        className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
        onClick={() => handleSort("userId")}
      >
        User ID
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-textDark">{row.getValue("userId")}</div>
    ),
  },
  {
    accessorKey: "cvCount",
    header: () => (
      <Button
        variant="ghost"
        className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
        onClick={() => handleSort("cvCount")}
      >
        Số lượng CV
      </Button>
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
    accessorKey: "avgScore",
    header: () => (
      <Button
        variant="ghost"
        className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
        onClick={() => handleSort("avgScore")}
      >
        Điểm trung bình
      </Button>
    ),
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
    header: () => (
      <Button
        variant="ghost"
        className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
        onClick={() => handleSort("lastUploadTime")}
      >
        Thời gian upload cuối
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-textNormal">
        {formatDate(row.getValue("lastUploadTime"))}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: () => (
      <Button
        variant="ghost"
        className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
        onClick={() => handleSort("updatedAt")}
      >
        Cập nhật gần nhất
      </Button>
    ),
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
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="sm"
        className="text-danger hover:bg-red-50 hover:text-danger cursor-pointer"
        onClick={() => openDeleteDialog(row.original._id)}
      >
        <Trash2 className="h-4 w-4 mr-1" />
        Xóa
      </Button>
    ),
  },
];
