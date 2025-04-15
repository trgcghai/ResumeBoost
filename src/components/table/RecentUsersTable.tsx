import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "./DataTable";

type User = {
  name: string;
  email: string;
  date: string;
};

const users: User[] = [
  {
    name: "Nguyen Van A",
    email: "nguyenvana@example.com",
    date: "15/12/2023",
  },
  {
    name: "Tran Thi B",
    email: "tranthib@example.com",
    date: "14/12/2023",
  },
  {
    name: "Le Van C",
    email: "levanc@example.com",
    date: "10/12/2023",
  },
  {
    name: "Pham Thi D",
    email: "phamthid@example.com",
    date: "09/12/2023",
  },
  {
    name: "Hoang Van E",
    email: "hoangvane@example.com",
    date: "08/12/2023",
  },
];

export default function RecentUsersTable() {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Họ và tên",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "date",
      header: "Thời gian đăng ký",
    },
  ];

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Người dùng gần đây</CardTitle>
        <p className="text-sm text-muted-foreground">
          Danh sách người dùng mới đăng ký
        </p>
      </CardHeader>
      <CardContent className="">
        <DataTable data={users} columns={columns} />
      </CardContent>
    </Card>
  );
}
