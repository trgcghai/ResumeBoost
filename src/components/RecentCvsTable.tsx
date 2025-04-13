import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cvs = [
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>CV gần đây</CardTitle>
        <p className="text-sm text-muted-foreground">
          Danh sách CV mới được tải lên
        </p>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr>
              <th>Tiêu đề</th>
              <th>Điểm</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {cvs.map((cv, idx) => (
              <tr key={idx} className="border-t">
                <td>
                  <div className="font-medium">{cv.title}</div>
                  <div className="text-muted-foreground">{cv.author}</div>
                </td>
                <td
                  className="text-sm"
                  style={{
                    color:
                      cv.score < 80
                        ? "var(--color-redText)"
                        : cv.score < 90
                        ? "var(--color-yellowText)"
                        : "var(--color-greenText)",
                  }}
                >
                  {cv.score}/100
                </td>

                <td>{cv.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
