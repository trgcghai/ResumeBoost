import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "./DataTable";

type CV = {
  title: string;
  author: string;
  score: number;
  date: string | Date;
};

const cvs: CV[] = [
  {
    title: "Frontend Developer CV",
    author: "Nguyen Van A",
    score: 87,
    date: "15/12/2023",
  },
  {
    title: "UX Designer Resume",
    author: "Tran Thi B",
    score: 92,
    date: "14/12/2023",
  },
  {
    title: "Full Stack Developer CV",
    author: "Le Van C",
    score: 78,
    date: "10/12/2023",
  },
  {
    title: "Project Manager Resume",
    author: "Pham Thi D",
    score: 85,
    date: "09/12/2023",
  },
  {
    title: "Data Analyst CV",
    author: "Hoang Van E",
    score: 90,
    date: "08/12/2023",
  },
];

export default function RecentCvsTable() {
  const columns: ColumnDef<CV>[] = [
    {
      accessorKey: "title",
      header: "Tiêu đề",
    },
    {
      accessorKey: "author",
      header: "Chủ sở hữu",
    },
    {
      accessorKey: "score",
      header: "Điểm",
    },
    {
      accessorKey: "date",
      header: "Ngày tải lên",
    },
  ];

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>CV gần đây</CardTitle>
        <p className="text-sm text-muted-foreground">
          Danh sách CV mới được tải lên
        </p>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={cvs} />
      </CardContent>
    </Card>
  );
}
