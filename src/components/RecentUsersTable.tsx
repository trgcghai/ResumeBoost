import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const users = [
  {
    name: "Nguyen Van A",
    email: "nguyenvana@example.com",
    status: "Hoạt động",
    date: "15/12/2023",
  },
  {
    name: "Tran Thi B",
    email: "tranthib@example.com",
    status: "Hoạt động",
    date: "14/12/2023",
  },
  {
    name: "Le Van C",
    email: "levanc@example.com",
    status: "Không hoạt động",
    date: "10/12/2023",
  },
  {
    name: "Pham Thi D",
    email: "phamthid@example.com",
    status: "Hoạt động",
    date: "09/12/2023",
  },
  {
    name: "Hoang Van E",
    email: "hoangvane@example.com",
    status: "Hoạt động",
    date: "08/12/2023",
  },
];

export default function RecentUsersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Người dùng gần đây</CardTitle>
        <p className="text-sm text-muted-foreground">
          Danh sách người dùng mới đăng ký
        </p>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr>
              <th>Họ và tên</th>
              <th>Trạng thái</th>
              <th>Email</th>
              <th>Thời gian đăng ký</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="border-t">
                <td>{user.name}</td>
                <td
                  className="text-sm"
                  style={{
                    color:
                      user.status === "Hoạt động"
                        ? "var(--color-greenText)"
                        : "var(--color-redText)",
                  }}
                >
                  {user.status}
                </td>
                <td>{user.email}</td>
                <td>{user.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
