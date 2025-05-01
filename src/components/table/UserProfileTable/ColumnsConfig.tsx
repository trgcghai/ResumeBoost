import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { UserProfile } from "@/type";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ColumnsConfigProps {
  openDeleteDialog: (id: string) => void;
  handleSort: (field: string) => void;
  handleUpdateRole: (userId: string, newRole: string) => Promise<boolean>;
}

export const getColumnsConfig = ({
  openDeleteDialog,
  handleSort,
  handleUpdateRole,
}: ColumnsConfigProps): ColumnDef<UserProfile>[] => [
  {
    accessorKey: "username",
    header: () => (
      <Button
        variant="ghost"
        className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
        onClick={() => handleSort("username")}
      >
        Username
      </Button>
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
      <Button
        variant="ghost"
        className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
        onClick={() => handleSort("role")}
      >
        Vai trò
      </Button>
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
        {format(
          (row.getValue("lastUploadTime") as Timestamp).toDate(),
          "HH:mm dd/MM/yyyy"
        )}
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
        {format(
          (row.getValue("updatedAt") as Timestamp).toDate(),
          "HH:mm dd/MM/yyyy"
        )}
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
      const userId = row.original.userId;
      const currentRole = row.original.role;

      return (
        <div className="flex items-center justify-start ml-4">
          <Popover>
            <PopoverTrigger className="bg-accent p-1 rounded-full flex items-center justify-center">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </PopoverTrigger>
            <PopoverContent className="p-2 space-y-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="role">Vai trò</Label>
                <Select
                  defaultValue={currentRole}
                  onValueChange={(value) => handleUpdateRole(userId, value)}
                >
                  <SelectTrigger id="role" className="flex-1">
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <Button
                variant="outline"
                size="sm"
                className="text-danger hover:bg-red-50 hover:text-danger cursor-pointer w-full"
                onClick={() => openDeleteDialog(row.original.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Xóa
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];
