import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Tốt", value: 65 },
  { name: "Trung bình", value: 25 },
  { name: "Kém", value: 10 },
];

const COLORS = [
  "var(--color-greenPie)",
  "var(--color-yellowPie)",
  "var(--color-redPie)",
];

export default function CvScorePieChart() {
  const renderCustomizedLabel = useCallback(
    ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
    }: {
      cx: number;
      cy: number;
      midAngle: number;
      innerRadius: number;
      outerRadius: number;
      percent: number;
      index: number;
    }) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          className="text-md font-bold text-textDark"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    },
    []
  );

  const renderColorfulLegendText = (value: string) => {
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <Card className="shadow-none">
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
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, "Tỉ lệ"]}
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
            />
            <Legend
              formatter={renderColorfulLegendText}
              layout="vertical"
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={12}
              wrapperStyle={{
                paddingTop: "15px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
