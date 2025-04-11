import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "T2", users: 400 },
  { day: "T3", users: 300 },
  { day: "T4", users: 460 },
  { day: "T5", users: 280 },
  { day: "T6", users: 600 },
  { day: "T7", users: 320 },
  { day: "CN", users: 260 },
];

export default function UserActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hoạt động người dùng</CardTitle>
        <p className="text-sm text-muted-foreground">
          Số lượng người dùng hoạt động trong 7 ngày qua
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
