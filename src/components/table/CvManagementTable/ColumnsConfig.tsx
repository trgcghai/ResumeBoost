import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { Resume } from "@/type";
import { format } from "date-fns";

interface ColumnsConfigProps {
  openDeleteDialog: (id: string) => void;
  handleSort: (field: string) => void;
}

export const getColumnsConfig = ({
  openDeleteDialog,
  handleSort,
}: ColumnsConfigProps): ColumnDef<Resume>[] => [
  {
    accessorKey: "fileName",
    header: () => (
      <Button
        variant="ghost"
        className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
        onClick={() => handleSort("fileName")}
      >
        Tên file
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-textDark">
        {row.getValue("fileName")}
      </div>
    ),
  },
  {
    accessorKey: "format",
    header: () => (
      <Button
        variant="ghost"
        className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
        onClick={() => handleSort("format")}
      >
        Loại file
      </Button>
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
      <Button
        variant="ghost"
        className="p-0 cursor-pointer text-textDark hover:text-main font-semibold"
        onClick={() => handleSort("createdAt")}
      >
        Ngày tạo
      </Button>
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
    id: "actions",
    header: () => (
      <Button
        variant="ghost"
        className="text-right text-textDark font-semibold"
      >
        Thao tác
      </Button>
    ),
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="sm"
        className="text-danger hover:bg-red-50 hover:text-danger cursor-pointer"
        onClick={() => openDeleteDialog(row.original.id)}
      >
        <Trash2 className="h-4 w-4 mr-1" />
        Xóa
      </Button>
    ),
  },
];
