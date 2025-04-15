import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded-md shadow-sm">
        <p className="text-sm font-medium">{`${label}: ${payload[0].value} người dùng`}</p>
      </div>
    );
  }
  return null;
};

export default function UserActivityChart() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Số lượng người dùng</CardTitle>
        <p className="text-sm text-muted-foreground">
          Số lượng người dùng sử dụng website trong tuần qua
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data}
            barSize={40}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="users"
              fill="var(--color-main)"
              radius={[10, 10, 0, 0]} // Rounded top corners
              isAnimationActive={true} // Enable animation
              animationDuration={1500} // Animation duration
              minPointSize={3} // Minimum size of bar
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
