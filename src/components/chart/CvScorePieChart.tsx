import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "var(--color-greenPie)",
  "var(--color-yellowPie)",
  "var(--color-redPie)",
];

interface CvScorePieChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

export default function CvScorePieChart({ data }: CvScorePieChartProps) {
  const hasOnlyOneType = useMemo(
    () => data.filter((item) => item.value > 0).length === 1,
    [data]
  );

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
      // Nếu chỉ có một loại dữ liệu, hiển thị tên loại và giá trị ở giữa
      if (hasOnlyOneType && percent > 0) {
        return (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-md font-bold text-textDark"
          >
            {`100%`}
          </text>
        );
      }

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
    [hasOnlyOneType]
  );

  const renderColorfulLegendText = (value: string) => {
    return <span className="text-sm font-medium">{value}</span>;
  };

  // Xử lý dữ liệu để loại bỏ các loại có giá trị 0
  const filteredData = data.filter((item) => item.value > 0);

  if (filteredData.length === 0) {
    return (
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Phân tích CV</CardTitle>
          <p className="text-sm text-muted-foreground">Phân bố điểm CV</p>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-[250px]">
          <p className="text-muted-foreground">Không có dữ liệu để hiển thị</p>
        </CardContent>
      </Card>
    );
  }

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
              data={filteredData}
              dataKey="value"
              nameKey="name"
              labelLine={false}
              innerRadius={hasOnlyOneType ? 0 : 0}
              outerRadius={hasOnlyOneType ? 80 : 80}
              strokeWidth={hasOnlyOneType ? 0 : 1}
              label={renderCustomizedLabel}
            >
              {filteredData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[
                      filteredData[index].name === "Tốt"
                        ? 0
                        : filteredData[index].name === "Trung bình"
                        ? 1
                        : 2
                    ]
                  }
                />
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
