import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Tốt", value: 65 },
  { name: "Trung bình", value: 25 },
  { name: "Kém", value: 10 },
];

const COLORS = [
  "var(--color-greenBgLight)",
  "var(--color-yellowBgLight)",
  "var(--color-redBgLight)",
];

export default function CvScorePieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân tích CV</CardTitle>
        <p className="text-sm text-muted-foreground">Phân bố điểm CV</p>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-[250px]">
        <ResponsiveContainer width="80%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
